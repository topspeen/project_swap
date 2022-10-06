import React, { Component } from 'react'
// import Nav from 'react-bootstrap/Nav'
import '../App.css'

class Navbar extends Component {

    
      render() {
        return (
          <div>
            <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">TopSwap</a>
    </div>
            <p align="right"  >{this.props.account}</p>
  </div>
</nav>
          </div>
        );
      }
  }
  
  export default Navbar;