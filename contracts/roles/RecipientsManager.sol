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
        require(
            isEligibleRecipient(msg.sender, groupId),
            'sorry, you are not an eligible recipient.'
        );
        _;
    }

    function isEligibleRecipient(address account, uint256 groupId)
        public
        view
        whenNotPaused
        returns (bool)
    {
        return eligibleRecipientsAddresstoIndex[groupId][account] > 0;
    }

    function amIEligibleRecipient(uint256 groupId)
        external
        view
        whenNotPaused
        returns (bool)
    {
        return eligibleRecipientsAddresstoIndex[groupId][msg.sender] > 0;
    }

    modifier onlyRegisteredRecipients(uint256 groupId) {
        require(
            isRegisteredRecipient(msg.sender, groupId),
            'sorry, you are not a registered recipient.'
        );
        _;
    }

    modifier hasntAlreadyClaimedWinnings(uint256 groupId, address account) {
            uint256 indexOfClaimer = eligibleRecipientsAddresstoIndex[groupId][
            msg.sender
        ];
        require(
            eligibleRecipientsHasCollectedWinnings[groupId][indexOfClaimer] != true,
            "whoops, looks like you've already claimed winnings!"
        );
        _;
    }

    function isRegisteredRecipient(address account, uint256 groupId)
        public
        view
        whenNotPaused
        returns (bool)
    {
        return registeredRecipientsAddressToIndex[groupId][account] > 0;
    }

    modifier isNotRegisteredRecipient(address account, uint256 groupId) {
        require(
            registeredRecipientsAddressToIndex[groupId][account] == 0,
            "whoops, looks like you've already registered for this event!"
        );
        _;
    }

    function amIRegisteredRecipient(uint256 groupId)
        external
        view
        whenNotPaused
        returns (bool)
    {
        return isRegisteredRecipient(msg.sender, groupId);
    }

    function amIPendingNewJoiner(uint256 groupId)
        external
        view
        whenNotPaused
        returns (bool)
    {
        return requestsToJoinGroupAddressToIndex[groupId][msg.sender] > 0;
    }

    modifier recipientEligibilityIsEnabled(uint256 groupId, address account) {
        uint256 indexOfEligibleRecipient = eligibleRecipientsAddresstoIndex[
            groupId
        ][msg.sender];

        require(
            eligibleRecipientsEligibilityIsEnabled[groupId][
                indexOfEligibleRecipient
            ] != false,
            "Error: recipient's eligiblility has been disabled for this group..."
        );
        _;
    }

    function registerForEvent(uint256 groupId)
        external
        onlyEligibleRecipients(groupId)
        recipientEligibilityIsEnabled(groupId, msg.sender)
        isNotRegisteredRecipient(msg.sender, groupId)
        whenNotPaused
    {
        if (registeredRecipientsNextIndex[groupId] == 0) {
            registeredRecipientsNextIndex[groupId] = 1;

            registeredRecipientAddressesArray[groupId].push(address(0));
            registeredRecipientNamesArray[groupId].push('');
            registeredRecipientsWinningsCollected[groupId].push(false);
        }

        registeredRecipientsAddressToIndex[groupId][
            msg.sender
        ] = registeredRecipientsNextIndex[groupId];

        uint256 indexOfEligibleRecipient = eligibleRecipientsAddresstoIndex[
            groupId
        ][msg.sender];
        string memory nameOfEligibleRecipient = eligibleRecipientNamesArray[
            groupId
        ][indexOfEligibleRecipient];

        registeredRecipientAddressesArray[groupId].push(msg.sender);
        registeredRecipientNamesArray[groupId].push(nameOfEligibleRecipient);
        registeredRecipientsWinningsCollected[groupId].push(false);

        currentEvents[groupId].registeredRecipientsCount =
            currentEvents[groupId].registeredRecipientsCount +
            1;

        registeredRecipientsNextIndex[groupId] =
            registeredRecipientsNextIndex[groupId] +
            1;

        emit RecipientRegistered(msg.sender, groupId);
    }

    function doIHaveClaimableWinnings(uint256 groupId)
        external
        view
        returns (bool hasclaimableWinnings)
    {
        if (!isRegisteredRecipient(msg.sender, groupId)) {
            return false;
        }

        uint256 indexOfClaimer = eligibleRecipientsAddresstoIndex[groupId][
            msg.sender
        ];

        return eligibleRecipientsHasCollectedWinnings[groupId][indexOfClaimer] == false;
    }

    function getEligibleRecipientsHasCollectedWinnings(uint256 groupId)
        external
        view
        returns (bool[] memory)
    {
        // return winningsCollected[groupId];
        // uint256 indexOfClaimer = eligibleRecipientsAddresstoIndex[groupId][
        //     msg.sender
        // ];
        return eligibleRecipientsHasCollectedWinnings[groupId];

    }

    function claimWinnings(uint256 groupId)
        external
        onlyRegisteredRecipients(groupId)
        hasntAlreadyClaimedWinnings(groupId, msg.sender)
        whenNotPaused
    {
        uint256 indexOfClaimer = eligibleRecipientsAddresstoIndex[groupId][
            msg.sender
        ];
        eligibleRecipientsHasCollectedWinnings[groupId][indexOfClaimer] = true;

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
        returns (
            address[] memory,
            string[] memory,
            bool[] memory
        )
    {
        return (
            registeredRecipientAddressesArray[groupId],
            registeredRecipientNamesArray[groupId],
            registeredRecipientsWinningsCollected[groupId]
        );
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

    modifier requestToJoinGroupIsPending(uint256 groupId, address account) {
        uint256 userIndex = requestsToJoinGroupAddressToIndex[groupId][account];
        require(
            userIndex > 0,
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

        requestsToJoinGroupAddressToIndex[groupId][
            msg.sender
        ] = requestsToJoinGroupNextIndex[groupId];

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
