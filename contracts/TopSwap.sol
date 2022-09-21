pragma solidity ^0.5.0;

import "./Token.sol";

contract TopSwap {
    string public name = "Topspeen Exchange";
    Token public token;
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

      constructor(Token _token) public {
        token = _token;
    }


    function buyTokens() public payable {
        // Calculate the number of tokens to buy
        uint tokenAmount = msg.value * rate;

        // Require that EthSwap has enought tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        // Transfer tokens to the user
        token.transfer(msg.sender, tokenAmount);

        // Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

  
}
