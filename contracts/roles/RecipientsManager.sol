// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../core/EthDropBase.sol";

contract RecipientsManager is EthDropBase {

    event EligibleRecipientAdded(address indexed account, uint groupId);
    event EligibleRecipientRemoved(address indexed account, uint groupId);

    event RecipientRegistered(address indexed account, uint groupId);
    event WinningsClaimed(address indexed account, uint groupId);

    constructor() {}

    modifier onlyEligibleRecipients(uint groupId) {
        require(isEligibleRecipient(msg.sender, groupId));
        _;
    }

    function isEligibleRecipient(address account, uint groupId)
        public
        view
        whenNotPaused
        returns (bool)
    {
        return eligibleRecipients[groupId][account] == true;
    }

    modifier onlyRegisteredRecipients(uint groupId) {
        require(isRegisteredRecipient(msg.sender, groupId));
        _;
    }

    function isRegisteredRecipient(address account, uint groupId)
        public
        view
        whenNotPaused
        returns (bool)
    {
        return registeredRecipients[groupId][account] == true;
    }

    function registerForEvent(uint groupId)
        external
        onlyEligibleRecipients(groupId)
        whenNotPaused
    {
        
        registeredRecipients[groupId][msg.sender] = true;
        registeredRecipientsArray[groupId].push(msg.sender);
        currentEvents[groupId].registeredRecipientsCount++;

        emit RecipientRegistered(msg.sender, groupId);
    }

    function claimWinnings(uint groupId)
        external
        onlyRegisteredRecipients(groupId)
        whenNotPaused
    {
        pot[groupId].release(payable(msg.sender));
        emit WinningsClaimed(msg.sender, groupId);
    }
}