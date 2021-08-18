var Migrations = artifacts.require("./Migrations_002.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
