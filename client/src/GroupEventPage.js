import React, { Component, useState, useEffect } from "react";
import getWeb3 from "./getWeb3";

import EthDropCore from "./contracts/EthDropCore.json";
import {
  BrowserRouter,
  useParams
} from "react-router-dom";

function GroupEventPage(props) {

  const [accounts, setAccounts] = useState([]);
  const [ethDropCoreInstance, setEthDropCoreInstance] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isCOO, setIsCOO] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isContributor, setIsContributor] = useState(null);
  const [adminsForGroup, setAdminsForGroup] = useState([]);
  const [isEligibleRecipient, setIsEligibleRecipient] = useState('');
  const [groupEventData, setGroupEventData] = useState('');
  const [newAdminInputValue, setNewAdminInputValue] = useState('');
  const [eligibleRecipients, setEligibleRecipients] = useState('');
  const [registeredRecipients, setRegisteredRecipients] = useState('');
  const [newEligibleRecipientInputValue, setEligibleRecipientInputValue] = useState('');
  const [eligibleRecipientsEligibilityEnabled, setEligibleRecipientsEligibilityEnabled] = useState('');
  const [isRegisteredRecipient, setIsRegisteredRecipient] = useState('');

  // let groupId;
  // let groupName;
  const groupName = useParams().groupName;
  const groupId = useParams().groupId;

  useEffect(() => {

    async function fetchData() {

      try {

        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = EthDropCore.networks[networkId];

        const ethDropCoreInstance = new web3.eth.Contract(
          EthDropCore.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setEthDropCoreInstance(ethDropCoreInstance);
        setWeb3(web3);
        setAccounts(accounts);

        const isAdmin = await ethDropCoreInstance.methods.amIAdmin(groupId).call({ from: accounts[0] });
        console.log('isAdmin ', isAdmin)
        setIsAdmin(isAdmin);

        const isCOO = await ethDropCoreInstance.methods.isCOO().call({ from: accounts[0] });
        console.log('isCOO ', isCOO)
        setIsCOO(isCOO);

        const isEligibleRecipient = await ethDropCoreInstance.methods.amIEligibleRecipient(groupId).call({ from: accounts[0] });
        console.log('isEligibleRecipient ', isEligibleRecipient)
        setIsEligibleRecipient(isEligibleRecipient);

        const isRegisteredRecipient = await ethDropCoreInstance.methods.amIRegisteredRecipient(groupId).call({ from: accounts[0] });
        console.log('isRegisteredRecipient ', isRegisteredRecipient)
        setIsRegisteredRecipient(isRegisteredRecipient);

        const isContributor = await ethDropCoreInstance.methods.amIContributor(groupId).call({ from: accounts[0] });
        console.log('isContributor ', isContributor)
        setIsContributor(isContributor);

        const adminsForGroup = await ethDropCoreInstance.methods.getAdminsForGroup(groupId).call({ from: accounts[0] });
        console.log('adminsForGroup ', adminsForGroup)
        setAdminsForGroup(adminsForGroup);

        const groupEventData = await ethDropCoreInstance.methods.getGroupEventData(groupId).call({ from: accounts[0] });
        console.log('groupEventData ', groupEventData)
        setGroupEventData(groupEventData);

        const eligibleRecipients = await ethDropCoreInstance.methods.getEligibleRecipientAddresses(groupId).call({ from: accounts[0] });
        console.log('eligibleRecipients ', eligibleRecipients)
        setEligibleRecipients(eligibleRecipients);

        const eligibleRecipientsEligibilityEnabled = await ethDropCoreInstance.methods.getEligibleRecipientIsEligibilityEnabled(groupId).call({ from: accounts[0] });
        console.log('eligibleRecipientsEligibilityEnabled ', eligibleRecipientsEligibilityEnabled)
        setEligibleRecipientsEligibilityEnabled(eligibleRecipientsEligibilityEnabled);

        const registeredRecipients = await ethDropCoreInstance.methods.getRegisteredRecipients(groupId).call({ from: accounts[0] });
        console.log('registeredRecipients ', registeredRecipients)
        setRegisteredRecipients(registeredRecipients);

      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    fetchData();

  });

  async function removeAdmin(address) {

    try {

      const isAdmin = await ethDropCoreInstance.methods.removeAdmin().send({ from: accounts[0] });
      console.log('admin removed!')
      setIsAdmin(isAdmin);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to remove admin...` + error,
      );

    }
  }

  async function startAirdropEvent(groupId) {

    try {

      await ethDropCoreInstance.methods.startEvent(groupId).send({ from: accounts[0] });
      console.log('event started!')
      // setIsAdmin(isAdmin);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to start event...` + error,
      );

    }
  }


  async function endRegistration(groupId) {

    try {

      await ethDropCoreInstance.methods.closeEventRegistration(groupId).send({ from: accounts[0] });
      console.log('closed event registration!')

    } catch (error) {
      alert(
        `Failed to close event registration...` + error,
      );

    }
  }

  async function endEvent(groupId) {

    try {

      await ethDropCoreInstance.methods.endEvent(groupId).send({ from: accounts[0] });
      console.log('ended event!')

    } catch (error) {
      alert(
        `Failed to end event...` + error,
      );

    }
  }

  async function registerForEvent(groupId) {

    try {

      await ethDropCoreInstance.methods.registerForEvent(groupId).send({ from: accounts[0] });
      console.log('registered for event!')

    } catch (error) {
      alert(
        `Failed to register for event...` + error,
      );

    }
  }

  async function claimWinnings(groupId) {

    try {

      await ethDropCoreInstance.methods.claimWinnings(groupId).send({ from: accounts[0] });
      console.log('claimed winnings!')

    } catch (error) {
      alert(
        `Failed to claim winnings...` + error,
      );

    }
  }


  async function newEligibleRecipientSubmit(event) {
    event.preventDefault();

    try {
      await ethDropCoreInstance.methods.addEligibleRecipient(newEligibleRecipientInputValue, groupId).send({ from: accounts[0] });
      console.log('added eligible recipient! ')

    }
    catch (err) {

      console.log('adding eligible recipient failed...', err);

    }
  }

  function newAdminHandleChange(event) {
    setNewAdminInputValue(event.target.value);
  }

  function newEligibleRecipientHandleChange(event) {
    setEligibleRecipientInputValue(event.target.value);
  }

  async function newAdminSubmit(event) {
    event.preventDefault();

    try {
      const createdGroup = await ethDropCoreInstance.methods.addAdmin(newAdminInputValue, groupId).send({ from: accounts[0] });
      console.log('added admin! ')

    }
    catch (err) {

      console.log('adding admin failed...', err);

    }
  }


  if (!web3) {
    return <h1>Loading web3...Group event page! {groupName}</h1>
  }

  if (web3)
    return (
      <div className="App">
        <br />
        <h1>{groupName}</h1>
        <br />
        <br />

        {isCOO && <div style={{ margin: "2vw", padding: "20px", border: "solid black 2px", borderRadius: "20px" }}>

          <h3>
            You are the COO!
          </h3>

          <br />

          <p>Since you are the COO, you can add and remove admins.</p>

          <br />
          <br />
          <br />

          <ul>

            Admins for group...
            {adminsForGroup[0] && adminsForGroup[0].map((adminAddress, i) => {

              return <li key="i">
                <h2>{adminAddress} - {adminsForGroup[1][i]}</h2> <button onClick={() => removeAdmin(adminAddress)}>&nbsp;x&nbsp;</button>
              </li>

            })}

          </ul>

          <br />

          <form onSubmit={newAdminSubmit}>
            <label>
              New Admin Address:
              <input type="text" value={newAdminInputValue} onChange={newAdminHandleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <br />
          <br />


        </div>}

        {isAdmin && <div>

          <h1>You are an Admin!</h1>

          <br />

          <p>That means you can add and remove <i>eligible recipients.</i></p>

          <br />

          <h1>Eligible Recipients</h1>

          <br />
          <br />

          {eligibleRecipients[0] && eligibleRecipients.map((eligibleRecipient, i) => {

            return <li key="i">
              {/* <p> */}
              {eligibleRecipient} - {JSON.stringify(eligibleRecipientsEligibilityEnabled[i])}
              {/* </p> */}
            </li>

          })}

          <br />
          <br />
          <form onSubmit={newEligibleRecipientSubmit}>
            <label>
              New Eligible Recipient Address:
              <input type="text" value={newEligibleRecipientInputValue} onChange={newEligibleRecipientHandleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

        </div>}

        <br />
        <br />
        <br />

        <h1>Current Event</h1>

        <p>event sponsor:</p>
        <h1>{groupEventData[3]}</h1>
        {/* <img src={groupEventData[4]} /> */}

        <p>{groupEventData[4]}</p>
        <p>{groupEventData[5]}</p>


        Event State:
        <h3>{groupEventData[0]}</h3>

        Total Amount Contributed:
        <h3>{groupEventData[2]}</h3>

        Registered Recipient Count:
        <h3>{groupEventData[1]}</h3>




        <br />
        <br />
        <br />
        <br />

        {/* Phase 0 - Has Not yet started */}
        {groupEventData[0] === '0' && <div>

          There is no event currently in progress!

        <br/>
        <br/>
          Check with the group admins for information on when the next airdrop event is happening!
        <br/>
        <br/>
          {isEligibleRecipient && <div>
            <p>You are an eligible recipient for airdrops by this group!</p>
            </div>}
          <br />
          <br />
          {isAdmin && <div>
            Since you are an admin, you can start the event by opening registration!

            <button onClick={() => startAirdropEvent(groupId)}>Start AirDrop Event</button>

          </div>}

          {!isAdmin && <div>
            <br />
            <p>Waiting for a group admin to open registration...</p>
            <br />
          </div>}

          <br />
        </div>}

        {/* Phase 1 - Registration */}
        {groupEventData[0] === '1' && <div>

          {/* Phase 2 - Registration */}
          There is currently an event in progress!

          <br />
          <br />


          {/* {!isAdmin && <div>
            <br />
            <p>Waiting for a group admin to open registration...</p>
            <br />
          </div>} */}


          {!isEligibleRecipient && <div>

            You are not an eligible recipient for this airdrop!

            Get in touch with the group admins to be added!
          </div>}

          <br />
        </div>}

        {/* Phase 2 - Claiming Winnings */}
        {groupEventData[0] === '2' && <div>

          {isAdmin && <div>
            Since you are an admin, you can end the event!

            <button onClick={() => endEvent(groupId)}>End Event</button>

          </div>}

          {isRegisteredRecipient && <div>

            Click the button below to claim your winnings!!

            <button onClick={() => claimWinnings(groupId)}>Claim Winnings</button>

          </div>}

        </div>}

        <br />
        <br />
        <br />
        <br />

        <br />
        <br />
        <br />
        <br />

        <br />
        <br />
        <br />
        <br />

        {/* Sponsor info */}

        {/* Current Pot */}

        {/* Number of Registered Recipients */}

        {/* 0 - not started */}
        <p>There is no event currently in progress for this group!</p>


        {/* 1 - Register */}

        {/* If eligible */}

        {/* If registered */}
        <p>You are registered for this event!</p>

        {/* If !registered */}
        <p>Show the Register button!</p>

        {/* If !eligible */}
        <p>Please ask an admin to add you as a eligible airdrop recipient for this group!</p>
        <p>Once you're added as an eligible recipient, you can join this ongoing event!</p>

        {/* 2 - Claim Winnings */}

        {/* If registered */}
        {/* If already claimed */}
        <p>You already claimed your reward for this event. Come back tomorrow for more!</p>

        {/* If NOT already claimed */}
        <p>Show claim button!</p>

        {/* If !registered */}
        <p>Please ask an admin to add you as a eligible airdrop recipient so you can participate in future events!</p>

        <br />
        <br />
        <br />

      </div>
    )
}

export default GroupEventPage;
