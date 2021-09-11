// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../roles/ExecutivesAccessControl.sol";

contract EthDropBase is ExecutivesAccessControl {
    /*** EVENTS ***/

    uint foo;

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

    uint256 devCutPercentage = 5;

    struct EthDropEvent {
        // The IRL organization that controls their own airdrops.
        // Each group can only be running 1 event at a time.
        uint256 groupId;
        // Event goes through a linear flow of states, finite state machine.
        string groupName;
        // Event goes through a linear flow of states, finite state machine.
        EventState currentState;
        // The timestamp from the block when this event started.
        uint256 startTime;
        // The timestamp from the block when registration for this event ended.
        uint256 registrationEndTime;
        // The timestamp from the block when this event ended.
        uint256 endTime;
        // The number of eligibleRecipients who have registered.
        uint256 registeredRecipientsCount;
        // Data about the sponsor info (address is stored in Roles)
        string sponsorName;
        string sponsorImageUrl;
        string sponsorLinkToUrl;
        address currentContributor;

        uint totalAmountContributed;
        uint weiWinnings;
        uint numberOfUsersWhoClaimedWinnings;
    }

    // ALL events happening now or in the future.
    // Key is the groupId
    uint256[] listOfGroupIds;
    string[] listOfGroupNames;

    // ALL events happening now or in the future.
    // Key is the groupId
    mapping(uint256 => EthDropEvent) currentEvents;

    // ALL events that have already happened.
    // Key is the groupId
    mapping(uint256 => EthDropEvent[]) pastEvents;

    // groupId => index in arrays for this specific address
    mapping(uint256 => mapping(address => uint256)) adminAddressToIndex;
    
    // groupId => nextAvailableIndex
    mapping(uint256 => uint256) nextAdminIndexForGroup;
    
    // groupId => list of admin addresses
    mapping(uint256 => address[]) adminAddresses;

    // groupId => list of admin names
    mapping(uint256 => string[]) adminNames;

    // groupId => whether of not user is an admin
    mapping(uint256 => bool[]) adminEnabled;

    mapping(uint256 => mapping(address => bool)) eligibleRecipients;
    
    mapping(uint256 => mapping(address => uint256)) eligibleRecipientsAddresstoIndex;
    mapping(uint256 => uint256) nextEligibleRecipientIndexForGroup;

    mapping(uint256 => address[]) eligibleRecipientAddressesArray;
    mapping(uint256 => string[]) eligibleRecipientNamesArray;
    mapping(uint256 => bool[]) eligibleRecipientsEligibilityIsEnabled;
    mapping(uint256 => mapping(address => string)) recipientAddressToName;


    // groupId => Role
    mapping(uint256 => mapping(address => bool)) winningsCollected;

    // Holds ALL contributors for all groups
    // groupId => Role
    mapping(uint256 => mapping(address => bool)) contributors;

    mapping(uint256 => mapping(address => bool)) requestsToJoinGroupAddressToIndex;

    mapping(uint256 => uint256) requestsToJoinGroupNextIndex;

    mapping(uint256 => mapping(address => string)) requestsToJoinGroupNames;
    mapping(uint256 => mapping(address => bool)) requestsToJoinGroupApprovals;

    // Holds ALL eligibleRecipients for all groups
    // groupId => Role
    // mapping(uint256 => mapping(address => bool)) eligibleRecipients;
    // mapping(uint256 => address[]) eligibleRecipientAddressesArray;
    // mapping(uint256 => string[]) eligibleRecipientNamesArray;
    // mapping(uint256 => bool[]) eligibleRecipientsEligibilityIsEnabled;
    // mapping(uint256 => mapping(address => string)) recipientAddressToName;

    mapping(uint256 => string[]) registeredRecipientNamesArray;

    // Holds ALL registeredRecipients for all groups
    // groupId => Role
    mapping(uint256 => mapping(address => bool)) registeredRecipients;

    // Holds ALL registeredRecipients in an array (for PaymentSplitter)
    // groupId => address[]
    mapping(uint256 => address[]) registeredRecipientAddressesArray;

    // Keeping track of winnings for all groups
    // mapping(uint256 => PaymentSplitter) pot;

    function getGroupIds() external view returns (uint256[] memory) {
        return listOfGroupIds;
    }

    function getGroupNames() external view returns (string[] memory) {
        return listOfGroupNames;
    }

    // stack too deep
    // function getGroupEventData(uint256 groupId)
    //     external
    //     view
    //     returns (
    //         uint256, // groupId
    //         // Event goes through a linear flow of states, finite state machine.
    //         string memory, // groupName
    //         // Event goes through a linear flow of states, finite state machine.
    //         EventState, // currentState,
    //         // The timestamp from the block when this event started.
    //         // uint256, // startTime,
    //         // // The timestamp from the block when registration for this event ended.
    //         // uint256, // registrationEndTime,
    //         // // The timestamp from the bock when this event ended.
    //         // uint256, // endTime,
    //         // The number of eligibleRecipients who have registered.
    //         uint256, // registeredRecipientsCount,
    //         // Data about the sponsor info (address is stored in Roles)
    //         string memory, // sponsorName,
    //         string memory, // sponsorImageUrl,
    //         string memory, // sponsorLinkToUrl,
    //         address // currentContributor,
    //     )
    // {
    //     // EthDropEvent memory groupData = currentEvents[groupId];

    //     return (
    //         currentEvents[groupId].groupId,
    //         currentEvents[groupId].groupName,
    //         currentEvents[groupId].currentState,
    //         // groupData.startTime,
    //         // groupData.registrationEndTime,
    //         // groupData.endTime,
    //         currentEvents[groupId].registeredRecipientsCount,
    //         currentEvents[groupId].sponsorName,
    //         currentEvents[groupId].sponsorImageUrl,
    //         currentEvents[groupId].sponsorLinkToUrl,
    //         currentEvents[groupId].currentContributor
    //     );
    // }

    function getGroupEventData(uint256 groupId)
        external
        view
        returns (
            // uint256, // groupId
            // Event goes through a linear flow of states, finite state machine.
            // string memory, // groupName
            // Event goes through a linear flow of states, finite state machine.
            EventState, // currentState,
            // The timestamp from the block when this event started.
            // uint256, // startTime,
            // // The timestamp from the block when registration for this event ended.
            // uint256, // registrationEndTime,
            // // The timestamp from the bock when this event ended.
            // uint256, // endTime,
            // The number of eligibleRecipients who have registered.
            uint256, // registeredRecipientsCount,
            uint256, // total amount contributed,
            // uint256, // registeredRecipientsCount,
            // Data about the sponsor info (address is stored in Roles)

            uint,
            uint 
            // address // currentContributor,
        )
    {
        EthDropEvent memory groupData = currentEvents[groupId];

        return ( 
            // groupData.groupId,
            // groupData.groupName,
            groupData.currentState,
            // groupData.startTime,
            // groupData.registrationEndTime,
            // groupData.endTime,
            groupData.registeredRecipientsCount,
            groupData.totalAmountContributed,

            groupData.weiWinnings,
            groupData.numberOfUsersWhoClaimedWinnings
            // groupData.currentContributor
        );
    }
}
