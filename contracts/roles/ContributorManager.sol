// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RecipientsManager.sol";

contract ContributorManager is RecipientsManager {
    event ContributorAdded(address indexed account, uint256 groupId);
    event ContributorRemoved(address indexed account, uint256 groupId);

    event ContributorAddressUpdated(uint groupId, address newContributor);
    event ContributorInfoUpdated(uint groupId, address newContributor);

    event ContributionMade(
        address indexed account,
        uint256 groupId,
        uint256 amount
    );

    constructor() {}

    modifier onlyContributor(uint256 groupId) {
        require(isContributor(msg.sender, groupId));
        _;
    }

    function isContributor(address account, uint256 groupId)
        public
        view
        whenNotPaused
        returns (bool)
    {
        return contributors[groupId][account] == true;
    }

    function amIContributor(uint256 groupId)
        external
        view
        whenNotPaused
        returns (bool)
    {
        return isContributor(msg.sender, groupId);
    }

    function getCurrentSponsorAddress(uint256 groupId)
        external
        view
        returns (address)
    {
        return currentEvents[groupId].currentContributor;
    }

    function renounceContributor(uint256 groupId)
        external
        onlyContributor(groupId)
        whenNotPaused
    {
        _removeContributor(msg.sender, groupId);
    }

    function _changeContributor(address account, uint256 groupId) internal {
        contributors[groupId][account] = true;

        currentEvents[groupId].currentContributor = account;
        emit ContributorAdded(account, groupId);
    }

    function _removeContributor(address account, uint256 groupId) internal {
        contributors[groupId][account] = false;

        currentEvents[groupId].currentContributor = address(0);
        emit ContributorRemoved(account, groupId);
    }

    function updateContributorInfo(
        uint256 groupId,
        string memory newContributorName,
        string memory newContributorImgUrl,
        string memory newContributorLinkToUrl
    ) external onlyContributor(groupId) {
        currentEvents[groupId].sponsorName = newContributorName;
        currentEvents[groupId].sponsorImageUrl = newContributorImgUrl;
        currentEvents[groupId].sponsorLinkToUrl = newContributorLinkToUrl;

        // emit contributor info updated
    }
    function getContributorInfo(uint groupId) external view returns (
        string memory newContributorName,
        string memory newContributorImgUrl,
        string memory newContributorLinkToUrl
    ) {
        return (
        currentEvents[groupId].sponsorName,
        currentEvents[groupId].sponsorImageUrl,
        currentEvents[groupId].sponsorLinkToUrl
        );
    }

    function contributeToPot(uint256 groupId)
        external
        payable
        onlyContributor(groupId)
        whenNotPaused
    {
        currentEvents[groupId].totalAmountContributed = msg.value;
        emit ContributionMade(msg.sender, groupId, msg.value);
    }
}
