const ExecutivesAccessControl = artifacts.require("ExecutivesAccessControl");

module.exports = function (deployer) {
  deployer.deploy(ExecutivesAccessControl);
};
