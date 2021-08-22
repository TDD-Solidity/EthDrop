const EthDropCore = artifacts.require("EthDropCore");

module.exports = function (deployer) {
  deployer.deploy(EthDropCore);
};
