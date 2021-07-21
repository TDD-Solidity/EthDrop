// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RecipientsManager.sol";

contract ContributorManager is RecipientsManager {

    event ContributorAdded(address indexed account, uint groupId);
    event ContributorRemoved(address indexed account, uint groupId);

    event ContributionMade(
        address indexed account,
        uint groupId,
        uint amount
    );

    constructor() {}

    modifier onlyContributor(uint groupId) {
        require(isContributor(msg.sender, groupId));
        _;
    }

    function isContributor(address account, uint groupId)
        public
        view
        whenNotPaused
        returns (bool)
    {
        return contributors[groupId][account] == true;
    }

    function renounceContributor(uint groupId)
        external
        onlyContributor(groupId)
        whenNotPaused
    {
        _removeContributor(msg.sender, groupId);
    }

    function _addContributor(address account, uint groupId) internal {
        contributors[groupId][account] = true;
        emit ContributorAdded(account, groupId);
    }

    function _removeContributor(address account, uint groupId) internal {
        contributors[groupId][account] = false;
        emit ContributorRemoved(account, groupId);
    }

    function contributeToPot(uint groupId)
        external
        payable
        onlyContributor(groupId)
        whenNotPaused
    {
        emit ContributionMade(msg.sender, groupId, msg.value);
    }
}