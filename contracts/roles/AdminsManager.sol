// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ContributorManager.sol';

contract AdminsManager is ContributorManager {
    event GroupCreated(uint256 groupId, string groupName);
    event EventStarted(uint256 groupId, address indexed startedBy);
    event RegistrationEnded(uint256 groupId, address indexed endedBy);
    event EventEnded(uint256 groupId, address indexed endedBy);
    event AdminAdded(uint256 groupId, address account, uint256 index);
    event AdminRemoved(uint256 groupId, string name);
    event AdminReEnabled(uint256 groupId, string name);
    event GettingMyAdminIndex(uint256 groupId, address account, uint256 index);

    event NewJoinerRequestApproved(
        uint256 groupId,
        address addressOfUserGettingApproved,
        string nameOfUserGettingApproved
    );

    event CalculatedPot(
        uint256 registeredRecipientCount,
        uint256 winningsPerRecipient
    );

    constructor() {}

    modifier onlyAdmins(uint256 groupId) {
        require(
            isAdmin(msg.sender, groupId),
            'only group admins can call this function!'
        );
        _;
    }

    modifier wasntAlreadyAnAdmin(uint256 groupId, address account) {
        require(adminAddressToIndex[groupId][account] == 0);
        _;
    }

    function isAdmin(address account, uint256 groupId)
        public
        view
        returns (bool)
    {
        uint256 adminIndex = adminAddressToIndex[groupId][account];

        // if user was never an admin, return false
        if (adminIndex == 0) {
            return false;
        }

        return adminEnabled[groupId][adminIndex] == true;
    }

    function getMyAdminIndex(uint256 groupId) external view returns (uint256) {
        return adminAddressToIndex[groupId][msg.sender];
    }

    // TODO - allow COO to give "admin-granting power" to other admins
    function addAdmin(
        uint256 groupId,
        address account,
        string memory name
    ) external wasntAlreadyAnAdmin(groupId, account) onlyCOO {
        _addAdmin(groupId, account, name);
    }

    // debug
    function getAddressNextAdminIndex(uint256 groupId)
        external
        view
        returns (uint256)
    {
        return nextAdminIndexForGroup[groupId];
    }

    function amIAdmin(uint256 groupId) external view returns (bool) {
        return isAdmin(msg.sender, groupId);
    }

    function getAdminsForGroup(uint256 groupId)
        external
        view
        returns (
            address[] memory,
            bool[] memory,
            string[] memory
        )
    {
        return (
            adminAddresses[groupId],
            adminEnabled[groupId],
            adminNames[groupId]
        );
    }

    modifier onlyAdminsOrCOO(uint256 groupId) {
        require(isAdmin(msg.sender, groupId) || msg.sender == cooAddress);
        _;
    }

    function reEnableAdmin(uint256 groupId, address account) external onlyCOO {
        uint256 index = adminAddressToIndex[groupId][account];
        adminEnabled[groupId][index] = true;
        emit AdminReEnabled(groupId, adminNames[groupId][index]);
    }

    function removeAdmin(uint256 groupId, address account) external onlyCOO {
        _removeAdmin(groupId, account);
    }

    function renounceAdmin(uint256 groupId) public onlyAdmins(groupId) {
        _removeAdmin(groupId, msg.sender);
    }

    function _addAdmin(
        uint256 groupId,
        address account,
        string memory name
    ) internal {
        // if first user, use index 1 and push some garbage things at the 0 index
        if (nextAdminIndexForGroup[groupId] == 0) {
            nextAdminIndexForGroup[groupId] = 1;

            adminAddresses[groupId].push(address(0));
            adminEnabled[groupId].push(false);
            adminNames[groupId].push('zero address');
        }

        adminAddressToIndex[groupId][account] = nextAdminIndexForGroup[groupId];

        adminAddresses[groupId].push(account);
        adminEnabled[groupId].push(true);
        adminNames[groupId].push(name);

        nextAdminIndexForGroup[groupId] = nextAdminIndexForGroup[groupId] + 1;

        emit AdminAdded(groupId, account, nextAdminIndexForGroup[groupId]);
    }

    function _removeAdmin(uint256 groupId, address account) internal {
        uint256 index = adminAddressToIndex[groupId][account];

        adminEnabled[groupId][index] = false;

        emit AdminRemoved(groupId, adminNames[groupId][index]);
    }

    function readEventInfo(uint256 groupId)
        external
        view
        onlyAdmins(groupId)
        returns (EthDropEvent memory)
    {
        return currentEvents[groupId];
    }

    function createNewGroup(string memory groupName)
        external
        onlyCOO
        whenNotPaused
    {
        // TODO - is this the best way to set the groupId? 🤔
        uint256 newGroupId = nextGroupId;

        EthDropEvent memory newGroup = EthDropEvent(
            newGroupId,
            groupName,
            EventState.CREATED,
            // block.timestamp,
            // block.timestamp,
            // block.timestamp,
            0,
            '',
            '',
            '',
            address(0),
            0,
            0,
            0
        );

        currentEvents[newGroupId] = newGroup;

        listOfGroupIds.push(newGroupId);
        listOfGroupNames.push(groupName);

        eligibleRecipientsAddresstoIndex[newGroupId][address(0)] = 0;
        eligibleRecipientsAddresstoIndex[newGroupId][address(0)] = 0;

        requestsToJoinGroupNextIndex[newGroupId] = 0;

        emit GroupCreated(newGroupId, groupName);

        nextGroupId++;
    }

    function startEvent(uint256 groupId)
        external
        onlyAdmins(groupId)
        whenNotPaused
    {
        currentEvents[groupId].currentState = EventState.REGISTRATION;

        emit EventStarted(groupId, msg.sender);
    }

    function closeEventRegistration(uint256 groupId)
        external
        onlyAdmins(groupId)
        whenNotPaused
    {
        require(
            currentEvents[groupId].registeredRecipientsCount > 0,
            "Can't end registration with zero registrants!"
        );

        uint256 devCutWei = (currentEvents[groupId].totalAmountContributed *
            devCutPercentage) / 100;

        // Transfer dev cut to cfo
        payable(cfoAddress).transfer(devCutWei);

        // pot is the amount for recipients to share
        uint256 pot = currentEvents[groupId].totalAmountContributed - devCutWei;

        // each recipient's winnings is the "weiWinnings"
        currentEvents[groupId].weiWinnings =
            pot /
            currentEvents[groupId].registeredRecipientsCount;

        currentEvents[groupId].currentState = EventState.CLAIM_WINNINGS;

        emit RegistrationEnded(groupId, msg.sender);
    }

    function endEvent(uint256 groupId)
        external
        onlyAdminsOrCOO(groupId)
        whenNotPaused
    {
        currentEvents[groupId].currentState = EventState.ENDED;

        // First delete mappings, then arrays
        for (
            uint256 i = 0;
            i < currentEvents[groupId].registeredRecipientsCount;
            i++
        ) {
            address currentAddress = registeredRecipientAddressesArray[groupId][
                i
            ];

            delete registeredRecipientsAddressToIndex[groupId][currentAddress];
        }

        delete registeredRecipientsWinningsCollected[groupId];
        delete registeredRecipientNamesArray[groupId];
        delete registeredRecipientAddressesArray[groupId];
        delete registeredRecipientsWinningsCollected[groupId];

        registeredRecipientsNextIndex[groupId] = 0;

        pastEvents[groupId].push(currentEvents[groupId]);

        currentEvents[groupId].registeredRecipientsCount = 0;
        currentEvents[groupId].totalAmountContributed = 0;
        currentEvents[groupId].weiWinnings = 0;
        currentEvents[groupId].numberOfUsersWhoClaimedWinnings = 0;

        emit EventEnded(groupId, msg.sender);
    }

    modifier notAlreadyEligibleRecipient(uint256 groupId, address account) {
        require(eligibleRecipientsAddresstoIndex[groupId][account] == 0,
            "Whoops, this address is already an eligible recipient!");
        _;
    }

    function addEligibleRecipient(
        address addressOfUserGettingApproved,
        string memory nameOfUserGettingApproved,
        uint256 groupId
    )
        public
        whenNotPaused
        onlyAdmins(groupId)
        notAlreadyEligibleRecipient(groupId, addressOfUserGettingApproved)
    {
        // if first user, use index 1 and push some garbage things at the 0 index
        if (nextEligibleRecipientIndexForGroup[groupId] == 0) {
            nextEligibleRecipientIndexForGroup[groupId] = 1;

            eligibleRecipientAddressesArray[groupId].push(address(0));
            eligibleRecipientNamesArray[groupId].push('');
            eligibleRecipientsEligibilityIsEnabled[groupId].push(false);
            eligibleRecipientsHasCollectedWinnings[groupId].push(true);
        }

        eligibleRecipientsAddresstoIndex[groupId][
            addressOfUserGettingApproved
        ] = nextEligibleRecipientIndexForGroup[groupId];

        eligibleRecipientAddressesArray[groupId].push(
            addressOfUserGettingApproved
        );
        eligibleRecipientNamesArray[groupId].push(nameOfUserGettingApproved);
        eligibleRecipientsEligibilityIsEnabled[groupId].push(true);
        eligibleRecipientsHasCollectedWinnings[groupId].push(false);

        nextEligibleRecipientIndexForGroup[groupId] =
            nextEligibleRecipientIndexForGroup[groupId] +
            1;

        emit EligibleRecipientAdded(addressOfUserGettingApproved, groupId);
    }

    function removeEligibleRecipient(address account, uint256 groupId)
        external
        onlyAdmins(groupId)
        whenNotPaused
    {
        uint256 index = eligibleRecipientsAddresstoIndex[groupId][account];
        eligibleRecipientsEligibilityIsEnabled[groupId][index] = false;
        emit EligibleRecipientRemoved(account, groupId);
    }

    function changeContributor(address account, uint256 groupId)
        external
        onlyAdminsOrCOO(groupId)
        whenNotPaused
    {
        _changeContributor(account, groupId);
    }

    function approveRequestToJoinGroup(
        uint256 groupId,
        address accountToApprove
    )
        external
        onlyAdmins(groupId)
        whenNotPaused
        notAlreadyInGroup(groupId, accountToApprove)
        requestToJoinGroupIsPending(groupId, accountToApprove)
    {
        uint256 requestsIndexOfUserGettingApproved = requestsToJoinGroupAddressToIndex[
                groupId
            ][accountToApprove];

        address addressOfUserGettingApproved = requestsToJoinGroupAddresses[
            groupId
        ][requestsIndexOfUserGettingApproved];

        string memory nameOfUserGettingApproved = requestsToJoinGroupNames[
            groupId
        ][requestsIndexOfUserGettingApproved];

        // updates requests approvals array
        requestsToJoinGroupApprovals[groupId][
            requestsIndexOfUserGettingApproved
        ] = true;

        addEligibleRecipient(
            addressOfUserGettingApproved,
            nameOfUserGettingApproved,
            groupId
        );

        emit NewJoinerRequestApproved(
            groupId,
            addressOfUserGettingApproved,
            nameOfUserGettingApproved
        );
    }

    function getNewJoinerRequests(uint256 groupId)
        external
        view
        onlyAdmins(groupId)
        returns (
            address[] memory,
            string[] memory,
            bool[] memory
        )
    {
        return (
            requestsToJoinGroupAddresses[groupId],
            requestsToJoinGroupNames[groupId],
            requestsToJoinGroupApprovals[groupId]
        );
    }

    function getEligibleRecipients(uint256 groupId)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            bool[] memory
        )
    {
        return (
            eligibleRecipientAddressesArray[groupId],
            eligibleRecipientNamesArray[groupId],
            eligibleRecipientsEligibilityIsEnabled[groupId]
        );
    }
}
