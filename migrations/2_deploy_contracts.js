const SafeMathLib = artifacts.require("SafeMath");
const ERC20Basic = artifacts.require("ERC20Basic");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(SafeMathLib);
  deployer.link(SafeMathLib, ERC20Basic);
  deployer.deploy(ERC20Basic, 10000);
};