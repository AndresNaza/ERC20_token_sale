var TangoToken = artifacts.require("./TangoToken.sol");
var TangoTokenSales = artifacts.require("./TangoTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");
require('dotenv').config({path: '../.env'});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(TangoToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(TangoTokenSales, 1, addr[0], TangoToken.address, KycContract.address);
    let tokenInstance = await TangoToken.deployed();
    await tokenInstance.transfer(TangoTokenSales.address, process.env.INITIAL_TOKENS);

};