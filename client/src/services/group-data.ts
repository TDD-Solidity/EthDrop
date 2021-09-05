import EthDropCore from '../contracts/EthDropCore.json';

import { ethers } from "ethers";
import { heardEvent_AppPaused } from '../state/actions/global-data';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


async function getGroupData(currentEthDropCoreReadInstance, groupId: number) {

    try {
        await currentEthDropCoreReadInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

// function eventStateChanged (groupId, newState)
// function sponsorInfoChanged (groupId, sponsorName, sponsorImageUrl, sponsorLinkToUrl, currentContributorAddress)
// function amountContributedToPot (groupId, totalAmountContributed)

// function eligibleUserAdded(groupId, newUserName, newUserAddress, numberOfEligibleRecipientsInGroup)
// function eligibleUserRemoved(groupId, removedUserName, removedUserAddress, numberOfEligibleRecipientsInGroup)

// function newRecipientRegistered(groupId, newUserName, newUserAddress, numberOfUsersCurrentlyRegistered)
// function userClaimedWinnings(groupId, removedUserName, removedUserAddress, numberOfUsersWhoClaimedWinnings)
