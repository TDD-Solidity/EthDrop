const ContributorManager = artifacts.require("ContributorManager");

module.exports = function (deployer) {
  deployer.deploy(ContributorManager);
};

