const web3_utils = require('web3-utils')
const Web3 = require('web3')
web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8545')
const Token = artifacts.require('Token')
const TopSwap = artifacts.require('TopSwap')




require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3_utils.toWei(n, 'ether');
}

contract('TopSwap', ([deployer, investor]) => {
    let token, topSwap

    before(async() => {
        token = await Token.new()
        topSwap = await TopSwap.new(token.address)
            // Transfer all tokens to TopSwap (1 million)
        await token.transfer(topSwap.address, tokens('1000000'))
    })

    describe('Token deployment', async() => {
        it('contract has a name', async() => {
            const name = await token.name()
            assert.equal(name, 'Topspeen Token')
        })
    })

    describe('EthSwap deployment', async() => {
        it('contract has a name', async() => {
            const name = await topSwap.name()
            assert.equal(name, 'Topspeen Exchange')
        })

        it('contract has tokens', async() => {
            let balance = await token.balanceOf(topSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('buyTokens()', async() => {
        let result

        before(async() => {
            // Purchase tokens before each example
            result = await topSwap.buyTokens({ from: investor, value: web3_utils.toWei('1', 'ether') });
        })

        it('Allows users to instantly purchase tokens from EthSwap for a fixed price', async() => {
            // Check investor token balance after purchase
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))

            // Check ethSwap balance after purchase
            let topSwapBalance
            topSwapBalance = await token.balanceOf(topSwap.address)
            assert.equal(topSwapBalance.toString(), tokens('999900'))
            topSwapBalance = await web3.eth.getBalance(topSwap.address)
            assert.equal(topSwapBalance.toString(), web3_utils.toWei('1', 'Ether'))
            console.log(result.logs[0].args)

            // Check log to ensure events was emitted with correct data
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
        })
    })

})