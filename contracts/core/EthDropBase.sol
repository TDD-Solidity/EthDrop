// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../roles/ExecutivesAccessControl.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract EthDropBase is ExecutivesAccessControl {
    /*** EVENTS ***/

    /// @dev The RegistrationOpen event is fired whenever a new event starts and users can begin restering.
    event RegistrationOpen();

    /// @dev The RegistrationOpen event is fired whenever a new event starts and users can begin restering.
    //    After this event fires users can no longer register, and users who have registered can claim winnings.
    event WinningsClaimingOpen();

    /// @dev The EventClose event is fired whenever an event closes. After this event is fired users can no
    //    longer claim winnings
    event EventClose();

    /// @dev Transfer event as defined in current draft of ERC721. Emitted every some Eth is transferred

    event Transfer(address from, address to); // Assumed Eth

    // TODO - (in later, more than just eth contracts as pass tokenId)
    // event Transfer(address from, address to, uint tokenId);

    /*** DATA TYPES ***/

    /// @dev The main Kitty struct. Every cat in CryptoKitties is represented by a copy
    ///  of this structure, so great care was taken to ensure that it fits neatly into
    ///  exactly two 256-bit words. Note that the order of the members in this structure
    ///  is important because of the byte-packing rules used by Ethereum.
    ///  Ref: http://solidity.readthedocs.io/en/develop/miscellaneous.html

    // TODO - ^ think harder about all that byte-packing junk... 😅

    enum EventState {
        CREATED,
        REGISTRATION,
        CLAIM_WINNINGS,
        ENDED
    }

    uint devCutPercentage = 5;

    struct EthDropEvent {
        // The IRL organization that controls their own airdrops.
        // Each group can only be running 1 event at a time.
        uint groupId;
        // Event goes through a linear flow of states, finite state machine.
        string groupName;
        // Event goes through a linear flow of states, finite state machine.
        EventState currentState;
        // The timestamp from the block when this event started.
        uint startTime;
        // The timestamp from the block when registration for this event ended.
        uint registrationEndTime;
        // The timestamp from the block when this event ended.
        uint endTime;
        // The number of eligibleRecipients who have registered.
        uint registeredRecipientsCount;
        // Data about the sponsor info (address is stored in Roles)
        string sponsorName;
        string sponsorImageUrl;
        string sponsorLinkToUrl;
        address currentContributor;
    }

    // ALL events happening now or in the future.
    // Key is the groupId
    uint[] listOfGroupIds;
    string[] listOfGroupNames;

    // ALL events happening now or in the future.
    // Key is the groupId
    mapping(uint => EthDropEvent) currentEvents;

    // ALL events that have already happened.
    // Key is the groupId
    mapping(uint => EthDropEvent[]) pastEvents;

    // Holds ALL admins for all groups
    // groupId => Role
    mapping(uint => mapping(address => bool)) admins;

    // Holds ALL contributors for all groups
    // groupId => Role
    mapping(uint => mapping(address => bool)) contributors;

    // Holds ALL eligibleRecipients for all groups
    // groupId => Role
    mapping(uint => mapping(address => bool)) eligibleRecipients;

    // Holds ALL registeredRecipients for all groups
    // groupId => Role
    mapping(uint => mapping(address => bool)) registeredRecipients;

    // Holds ALL registeredRecipients in an array (for PaymentSplitter)
    // groupId => address[]
    mapping(uint => address[]) registeredRecipientsArray;

    // Keeping track of winnings for all groups
    mapping(uint => PaymentSplitter) pot;

    function getGroupIds() external view returns (uint[] memory) {
        return listOfGroupIds;
    }
    
    function getGroupNames() external view returns (string[] memory) {
        return listOfGroupNames;
    }

}