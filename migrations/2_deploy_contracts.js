const Token = artifacts.require("Token")
const TopSwap = artifacts.require("TopSwap")

module.exports = async function(deployer) {
    // Deploy Token
    await deployer.deploy(Token)
    const token = await Token.deployed()

    // Deploy EthSwap
    await deployer.deploy(TopSwap, token.address)
    const topSwap = await TopSwap.deployed()

    // Transfer all tokens to EthSwap (1 million)
    await token.transfer(topSwap.address, '1000000000000000000000000')
};