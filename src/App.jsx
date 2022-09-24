import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

class App extends Component {

    
  async componentDidMount() {    
    await this.loadWeb3()
    await this.loadBlockchainData()
    
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])
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

    render() {
      return (
        <div>
       topspeen
        </div>
      );
    }
}

export default App;