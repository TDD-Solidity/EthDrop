// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RecipientsManager.sol";

contract ContributorManager is RecipientsManager {
    event ContributorAdded(address indexed account, uint256 groupId);
    event ContributorRemoved(address indexed account, uint256 groupId);

    event ContributorAddressUpdated(uint256 groupId, address newContributor);
    event ContributorInfoUpdated(
        uint256 groupId,
        string sponsorName,
        string imgUrl,
        string imgLinkToUrl
    );

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
        return account == currentEvents[groupId].currentContributor;
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

    function _changeContributor(address account, uint256 groupId) internal {
        contributors[groupId][account] = true;

        currentEvents[groupId].currentContributor = account;
        emit ContributorAdded(account, groupId);
    }

    function updateContributorInfo(
        uint256 groupId,
        string memory newContributorName,
        string memory newContributorImgUrl,
        string memory newContributorLinkToUrl
    ) external onlyContributor(groupId) {
        if (bytes(newContributorName).length > 0) {
            currentEvents[groupId].sponsorName = newContributorName;
        }
        if (bytes(newContributorImgUrl).length > 0) {
            currentEvents[groupId].sponsorImageUrl = newContributorImgUrl;
        }
        if (bytes(newContributorLinkToUrl).length > 0) {
            currentEvents[groupId].sponsorLinkToUrl = newContributorLinkToUrl;
        }

        emit ContributorInfoUpdated(
            groupId,
            currentEvents[groupId].sponsorName,
            currentEvents[groupId].sponsorImageUrl,
            currentEvents[groupId].sponsorLinkToUrl
        );
    }

    function getContributorInfo(uint256 groupId)
        external
        view
        returns (
            string memory newContributorName,
            string memory newContributorImgUrl,
            string memory newContributorLinkToUrl
        )
    {
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
        currentEvents[groupId].totalAmountContributed += msg.value;
        emit ContributionMade(
            msg.sender,
            groupId,
            currentEvents[groupId].totalAmountContributed
        );
    }
}
