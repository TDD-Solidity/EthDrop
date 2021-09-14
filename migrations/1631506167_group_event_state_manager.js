const GroupEventStateManager = artifacts.require("GroupEventStateManager");

module.exports = function (deployer) {
  deployer.deploy(GroupEventStateManager);
};