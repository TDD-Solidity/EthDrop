// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ContributorManager.sol";

contract AdminsManager is ContributorManager {
    event GroupCreated(string groupName, uint256 groupId);
    event EventStarted(address indexed startedBy, uint256 groupId);
    event RegistrationEnded(address indexed endedBy, uint256 groupId);
    event EventEnded(address indexed endedBy, uint256 groupId);
    event AdminAdded(uint256 groupId, address account, uint256 index);
    event AdminRemoved(uint256 groupId, string name);
    event AdminReEnabled(uint256 groupId, string name);
    event GettingMyAdminIndex(uint256 groupId, address account, uint256 index);

    event CalculatedPot(
        uint256 registeredRecipientCount,
        uint256 winningsPerRecipient
    );

    constructor() {}

    modifier onlyAdmins(uint256 groupId) {
        require(isAdmin(msg.sender, groupId));
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

        // emit AdminAdded(groupId, account, newNextIndex);

        nextAdminIndexForGroup[groupId] = nextAdminIndexForGroup[groupId] + 1;
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
        uint256 newGroupId = block.timestamp;

        EthDropEvent memory newGroup = EthDropEvent(
            newGroupId,
            groupName,
            EventState.CREATED,
            block.timestamp,
            block.timestamp,
            block.timestamp,
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

        emit GroupCreated(groupName, newGroupId);
    }

    function startEvent(uint256 groupId)
        external
        onlyAdmins(groupId)
        whenNotPaused
    {
        currentEvents[groupId].currentState = EventState.REGISTRATION;
        currentEvents[groupId].startTime = block.timestamp;

        emit EventStarted(msg.sender, groupId);
    }

    function closeEventRegistration(uint256 groupId)
        external
        onlyAdmins(groupId)
        whenNotPaused
    {
        require(
            currentEvents[groupId].registeredRecipientsCount >= 1,
            "Can't end registration with zero registrants!"
        );

        currentEvents[groupId].registrationEndTime = block.timestamp;

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

        emit RegistrationEnded(msg.sender, groupId);
    }

    function endEvent(uint256 groupId)
        external
        onlyAdminsOrCOO(groupId)
        whenNotPaused
    {
        currentEvents[groupId].endTime = block.timestamp;

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

            delete registeredRecipients[groupId][currentAddress];
            delete recipientAddressToName[groupId][currentAddress];
            delete winningsCollected[groupId][currentAddress];
        }

        delete registeredRecipientNamesArray[groupId];
        delete registeredRecipientAddressesArray[groupId];

        pastEvents[groupId].push(currentEvents[groupId]);

        currentEvents[groupId].registeredRecipientsCount = 0;
        currentEvents[groupId].totalAmountContributed = 0;
        currentEvents[groupId].weiWinnings = 0;
        currentEvents[groupId].numberOfUsersWhoClaimedWinnings = 0;

        emit ContributionMade(msg.sender, groupId, 0);
        emit RecipientRegistered(msg.sender, groupId);
        emit EventEnded(msg.sender, groupId);
    }

    function addEligibleRecipient(
        address account,
        string memory name,
        uint256 groupId
    ) external whenNotPaused onlyAdmins(groupId) {
        eligibleRecipients[groupId][account] = true;

        eligibleRecipientAddressesArray[groupId].push(account);
        eligibleRecipientNamesArray[groupId].push(name);

        recipientAddressToName[groupId][account] = name;
        eligibleRecipientsEligibilityIsEnabled[groupId].push(true);

        emit EligibleRecipientAdded(account, groupId);
    }

    function removeEligibleRecipient(address account, uint256 groupId)
        external
        onlyAdmins(groupId)
        whenNotPaused
    {
        eligibleRecipients[groupId][account] = false;
        emit EligibleRecipientRemoved(account, groupId);
    }

    function changeContributor(address account, uint256 groupId)
        external
        onlyAdminsOrCOO(groupId)
        whenNotPaused
    {
        _changeContributor(account, groupId);
    }

    function approveRequestToJoinGroup(uint256 groupId, address accountToApprove) 
        external
        onlyAdmins(groupId)
        whenNotPaused
        notAlreadyInGroup(groupId, accountToApprove)
        requestsToJoinGroupIsPending(groupId, accountToApprove)
    {

        // set eligible recipients stuff

        // set requestapprovals for the address

    }
}
