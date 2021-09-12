// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../core/EthDropBase.sol';

contract RecipientsManager is EthDropBase {
    event EligibleRecipientAdded(address indexed account, uint256 groupId);
    event EligibleRecipientRemoved(address indexed account, uint256 groupId);

    event RecipientRegistered(address indexed account, uint256 groupId);
    event WinningsClaimed(address indexed account, uint256 groupId);
    event NewUserRequestedToJoinGroup(
        uint256 groupId,
        address account,
        uint256 index
    );

    constructor() {}

    modifier onlyEligibleRecipients(uint256 groupId) {
        require(isEligibleRecipient(msg.sender, groupId));
        _;
    }

    function isEligibleRecipient(address account, uint256 groupId)
        public
        view
        whenNotPaused
        returns (bool)
    {
        return eligibleRecipients[groupId][account] == true;
    }

    function amIEligibleRecipient(uint256 groupId)
        external
        view
        whenNotPaused
        returns (bool)
    {
        return isEligibleRecipient(msg.sender, groupId);
    }

    modifier onlyRegisteredRecipients(uint256 groupId) {
        require(isRegisteredRecipient(msg.sender, groupId));
        _;
    }

    modifier hasntAlreadyClaimedWinnings(uint256 groupId, address account) {
        require(winningsCollected[groupId][msg.sender] != true);
        _;
    }

    function isRegisteredRecipient(address account, uint256 groupId)
        public
        view
        whenNotPaused
        returns (bool)
    {
        return registeredRecipients[groupId][account] == true;
    }

    function amIRegisteredRecipient(uint256 groupId)
        external
        view
        whenNotPaused
        returns (bool)
    {
        return isRegisteredRecipient(msg.sender, groupId);
    }

    function registerForEvent(uint256 groupId)
        external
        onlyEligibleRecipients(groupId)
        whenNotPaused
    {
        registeredRecipients[groupId][msg.sender] = true;
        registeredRecipientAddressesArray[groupId].push(msg.sender);

        string memory name = recipientAddressToName[groupId][msg.sender];

        registeredRecipientNamesArray[groupId].push(name);

        currentEvents[groupId].registeredRecipientsCount++;

        emit RecipientRegistered(msg.sender, groupId);
    }

    function doIHaveClaimableWinnings(uint256 groupId)
        external
        view
        returns (bool)
    {
        if (!isRegisteredRecipient(msg.sender, groupId)) {
            return false;
        }

        return winningsCollected[groupId][msg.sender] != true;
    }

    function claimWinnings(uint256 groupId)
        external
        onlyRegisteredRecipients(groupId)
        hasntAlreadyClaimedWinnings(groupId, msg.sender)
        whenNotPaused
    {
        winningsCollected[groupId][msg.sender] = true;
        currentEvents[groupId].numberOfUsersWhoClaimedWinnings++;

        payable(msg.sender).transfer(currentEvents[groupId].weiWinnings);

        emit WinningsClaimed(msg.sender, groupId);
    }

    function getEligibleRecipientAddresses(uint256 groupId)
        external
        view
        returns (address[] memory)
    {
        return eligibleRecipientAddressesArray[groupId];
    }

    function getEligibleRecipientNames(uint256 groupId)
        external
        view
        returns (string[] memory)
    {
        return eligibleRecipientNamesArray[groupId];
    }

    function getRegisteredRecipientNames(uint256 groupId)
        external
        view
        returns (string[] memory)
    {
        return registeredRecipientNamesArray[groupId];
    }

    function getEligibleRecipientIsEligibilityEnabled(uint256 groupId)
        external
        view
        returns (bool[] memory)
    {
        return eligibleRecipientsEligibilityIsEnabled[groupId];
    }

    function getRegisteredRecipients(uint256 groupId)
        external
        view
        returns (address[] memory)
    {
        return registeredRecipientAddressesArray[groupId];
    }

    modifier requestsToJoinGroupNotAlreadyPending(
        uint256 groupId,
        address account
    ) {
        uint256 userIndex = requestsToJoinGroupAddressToIndex[groupId][account];
        require(
            userIndex == 0,
            'Error: this address has already requested to join this group.'
        );
        _;
    }

    modifier requestsToJoinGroupIsPending(uint256 groupId, address account) {
        uint256 userIndex = requestsToJoinGroupAddressToIndex[groupId][account];
        require(
            userIndex > 0 && requestedToJoinGroup[groupId][userIndex],
            'Error: this address does not have a pending request to join this group.'
        );
        _;
    }

    modifier notAlreadyInGroup(uint256 groupId, address account) {
        uint256 userIndex = eligibleRecipientsAddresstoIndex[groupId][account];
        require(
            userIndex == 0,
            'Error: recipient is already an eligible recipient in the group.'
        );
        _;
    }

    // functions for recipients not yet eligible
    function requestToJoinGroup(uint256 groupId, string calldata username)
        external
        requestsToJoinGroupNotAlreadyPending(groupId, msg.sender)
        notAlreadyInGroup(groupId, msg.sender)
    {
        if (requestsToJoinGroupNextIndex[groupId] == 0) {
            requestsToJoinGroupNextIndex[groupId] = 1;

            requestsToJoinGroupAddresses[groupId].push(address(0));
            requestsToJoinGroupNames[groupId].push('');
            requestedToJoinGroup[groupId].push(false);
            requestsToJoinGroupApprovals[groupId].push(false);
        }

        requestsToJoinGroupAddressToIndex[groupId][msg.sender] = requestsToJoinGroupNextIndex[groupId];

        requestsToJoinGroupAddresses[groupId].push(msg.sender);
        requestsToJoinGroupNames[groupId].push(username);
        requestedToJoinGroup[groupId].push(true);
        requestsToJoinGroupApprovals[groupId].push(false);

        requestsToJoinGroupNextIndex[groupId] =
            requestsToJoinGroupNextIndex[groupId] +
            1;

        emit NewUserRequestedToJoinGroup(
            groupId,
            msg.sender,
            nextAdminIndexForGroup[groupId]
        );
    }

  
}
