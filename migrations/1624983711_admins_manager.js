const AdminsManager = artifacts.require("AdminsManager");

module.exports = function (deployer) {
  deployer.deploy(AdminsManager);
};
