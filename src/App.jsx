import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import TopSwap from './abis/TopSwap.json'
import Token from './abis/Token.json'

class App extends Component {

    
  async componentDidMount() {    
    await this.loadWeb3()
    await this.loadBlockchainData()
    
  }

  async loadBlockchainData() {
    const web3 = window.web3
    

    const accounts = await web3.eth.getAccounts()

    this.setState({ account: accounts[0]})
    
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState( {ethBalance: ethBalance})

    // Load token
    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
    this.setState( {token: token} )
    let tokenBalance = await token.methods.balanceOf(this.state.account).call()
    console.log("TokenBalance", tokenBalance.toString())
    //  console.log(tokenData)
    this.setState({tokenBalance: tokenBalance.toString()})
    } else {
      window.alert('Token contract not deployed to detected network')
    }
    
    // Load TopSwap
    const TopSwapData = TopSwap.networks[networkId]
    // console.log(TopSwapData)
    if(TopSwapData) {
      const topswap = new web3.eth.Contract(TopSwap.abi, TopSwapData.address)
    this.setState({topswap: topswap})
    console.log(this.state.topswap)
    } else {
      window.alert('TopSwap contract not deployed to detected network')
    }

    this.setState({loading: false})
  }

    async loadWeb3() {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
      } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
      } else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
  }
 
    constructor(props) {
      super(props)
      this.state = { 
        account: '',
        token: {},
        ethBalance: '0',
        tokenBalance: '0',
        topswap: {},
        loading: true  

      }

    }

    render() {
      let content
      if(this.state.loading) {
        content = <p id="loader" className='text-center'>Loading...</p>
      } else {
        content = <Main />
      }
      return (
        <div>
          <Navbar account={this.state.account} />
          {content}
        </div>
      );
    }
}

export default App;