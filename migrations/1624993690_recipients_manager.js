const RecipientsManager = artifacts.require("RecipientsManager");

module.exports = function (deployer) {
  deployer.deploy(RecipientsManager);
};
