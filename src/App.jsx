import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import Navbar from './components/Navbar'
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

    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
    console.log(token)
    } else {
      window.alert('Token contract not deployed to detected network')
    }
    
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
        ethBalance: '0'  
      }

    }

    render() {
      
      console.log(this.state.account)
      console.log(this.state.ethBalance)
      return (
        <div>
          <Navbar account={this.state.account} />
       topspeen
        </div>
      );
    }
}

export default App;