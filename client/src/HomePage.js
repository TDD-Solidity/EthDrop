import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import EthDropCore from "./contracts/EthDropCore.json";
import getWeb3 from "./getWeb3";
import env from "react-dotenv";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class Home extends Component {

  connectMetaMask() {

  }

  constructor(props) {

    super(props);

    this.newCOOHandleChange = this.newCOOHandleChange.bind(this);
    this.newCOOHandleSubmit = this.newCOOHandleSubmit.bind(this);
    this.newCFOHandleChange = this.newCFOHandleChange.bind(this);
    this.newCFOHandleSubmit = this.newCFOHandleSubmit.bind(this);
    this.newGroupChange2 = this.newGroupChange2.bind(this);
    this.newGroupSubmit2 = this.newGroupSubmit2.bind(this);
    this.unpauseEntireApp = this.unpauseEntireApp.bind(this);
    this.pauseEntireApp = this.pauseEntireApp.bind(this);
  }

  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    simpleStorageInstance: null,
    ethDropCoreInstance: null,
    isCEO: null,
    isCFO: null,
    newCFOInputValue: '',
    isCOO: null,
    newCOOInputValue: '',
    groupNames: [],
    groupIds: [],
    errorToDisplay: null,
    currentCFO: '',
    currentCOO: '',
    stringgg: '',
    whoami: '',
    currentCfoBalance: 0,
    createGroupErrorToDisplay: null,
    newCOOInputValue: '',
    newGroupInputValue: '',
    newGroupInputValue2: '',
    isPaused: null,
    ceoPausingErrorToDisplay: null
  };

  componentDidMount = async () => {
    try {
      //   // Get network provider and web3 instance.
      const web3 = await getWeb3();

      //   // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      //   // const accounts = window.ethereum.request("eth_requestAccounts")
      //   console.log('accounts are: ', accounts);

      //   // Get the contract instance.

      //   console.log('network is: ', networkId);

      //   console.log('address: ', deployedNetwork.address);

      //   // console.log('ok: ', env.CONTRACT_ADDRESS)
      //   // console.log('ok: ', env.SIMPLE_STORAGE_CONTRACT_ADDRESS)

      //   const simpleStorageInstance = new web3.eth.Contract(
      //     SimpleStorageContract.abi,
      //     env.SIMPLE_STORAGE_CONTRACT_ADDRESS
      //     // ,
      //     // deployedNetwork && deployedNetwork.address,
      //   );
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EthDropCore.networks[networkId];

      const ethDropCoreInstance = new web3.eth.Contract(
        EthDropCore.abi,
        deployedNetwork && deployedNetwork.address,
      );


      //   // Set web3, accounts, and contract to the state, and then proceed with an
      //   // example of interacting with the contract's methods.
      this.setState({ accounts, ethDropCoreInstance, web3 });

      await this.runExample();

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  };

  runExample = async () => {
    const { accounts, ethDropCoreInstance } = this.state;

    // Stores a given value, 5 by default.
    // await simpleStorageInstance.methods.set(5).send({ from: accounts[0] });


    // Get the value from the simpleStorageInstance to prove it worked.
    // const response = await simpleStorageInstance.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });

    // Get the value from the simpleStorageInstance to prove it worked.
    const fooResponse = await ethDropCoreInstance.methods.foobar().call();

    // const fooResponse = await ethDropCoreInstance.methods.foobar().call();

    const whoami = await ethDropCoreInstance.methods.whoami().call({ from: this.state.accounts[0] });
    console.log('whoami ', whoami)
    this.setState({ whoami });

    const currentAddressShortened = whoami.substr(0, 6) + '...' + whoami.substr(whoami.length - 5);

    const isPaused = await ethDropCoreInstance.methods.isPaused().call({ from: this.state.accounts[0] });
    console.log('isPaused ', isPaused)
    this.setState({ isPaused });

    const isCEO = await ethDropCoreInstance.methods.isCEO().call({ from: this.state.accounts[0] });
    console.log('isCEO ', isCEO)
    this.setState({ isCEO });

    const isCOO = await ethDropCoreInstance.methods.isCOO().call({ from: this.state.accounts[0] });
    console.log('isCOO ', isCOO)
    this.setState({ isCOO });

    const currentCOO = await ethDropCoreInstance.methods.getCOO().call({ from: this.state.accounts[0] });
    console.log('currentCOO ', currentCOO)
    this.setState({ currentCOO });

    const isCFO = await ethDropCoreInstance.methods.isCFO().call({ from: this.state.accounts[0] });
    console.log('isCFO ', isCFO)
    this.setState({ isCFO });

    const currentCFO = await ethDropCoreInstance.methods.getCFO().call({ from: this.state.accounts[0] });
    console.log('currentCFO ', currentCFO)
    this.setState({ currentCFO });

    // const currentCfoBalance = await ethDropCoreInstance.methods.currentCfoBalance().call({ from: this.state.accounts[0] });
    // console.log('currentCfoBalance ', currentCfoBalance)
    // this.setState({ currentCfoBalance });

    const currentCfoBalance = 0;

    const groupIds = await ethDropCoreInstance.methods.getGroupIds().call({ from: this.state.accounts[0] });
    console.log('groupIds: ', groupIds)
    this.setState({ groupIds });

    const groupNames = await ethDropCoreInstance.methods.getGroupNames().call({ from: this.state.accounts[0] });
    console.log('groupNames: ', groupNames)
    this.setState({ groupNames });

    // On group page
    // const amIAdminOfGroup = await ethDropCoreInstance.methods.amIAdminOfGroup('groupId').call();
    // console.log('amIAdminOfGroup: ', amIAdminOfGroup)
    // this.setState(amIAdminOfGroup);

    // On group page
    // const amIEligiblRecipientForGroup = await ethDropCoreInstance.methods.amIEligiblRecipientForGroup('groupId').call();
    // console.log('amIEligiblRecipientForGroup: ', amIEligiblRecipientForGroup)
    // this.setState(amIEligiblRecipientForGroup);

    // On group page
    // const amIRegisteredRecipientForGroupEvent = await ethDropCoreInstance.methods.amIRegisteredRecipientForGroupEvent('groupId').call();
    // console.log('amIRegisteredRecipientForGroupEvent: ', amIRegisteredRecipientForGroupEvent)
    // this.setState(amIRegisteredRecipientForGroupEvent);

    // On group page
    // const myUnclaimedEthBalance = await ethDropCoreInstance.methods.myUnclaimedEthBalance('groupId').call();
    // console.log('myUnclaimedEthBalance: ', myUnclaimedEthBalance)
    // this.setState(myUnclaimedEthBalance);

    // console.log('fooResponse: ', fooResponse);

  };

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  async newCOOHandleSubmit(event) {
    event.preventDefault();
    console.log('newCOOHandleSubmit: ' + this.state.newCOOInputValue.trim());
    console.log('hex: ', this.state.newCOOInputValue);

    try {
      // const ok = await this.state.ethDropCoreInstance.methods.setString(this.state.newCFOInputValue).send({ from: this.state.accounts[0] });
      // console.log('update string success!')
      // console.log('ok: ', ok)

      // const currentString = await this.state.ethDropCoreInstance.methods.getString().call();
      // console.log('string: ', currentString)
      // this.setState({ currentString });

      await this.state.ethDropCoreInstance.methods.setCOO(this.state.newCOOInputValue).send({ from: this.state.accounts[0] });
      console.log('update COO success!')

      const currentCOO = await this.state.ethDropCoreInstance.methods.getCOO().call({ from: this.state.accounts[0] });
      console.log('currentCOO ', currentCOO)
      this.setState({ currentCOO, newCOOInputValue: '' });
    }
    catch (err) {

      console.log('update COO failed...', err);

      this.setState({ errorToDisplay: err });
    }
  }

  async newCFOHandleSubmit(event) {
    event.preventDefault();
    console.log('newCFOHandleSubmit: ' + this.state.newCFOInputValue.trim());
    console.log('hex: ', this.state.newCFOInputValue);

    try {
      // const ok = await this.state.ethDropCoreInstance.methods.setString(this.state.newCFOInputValue).send({ from: this.state.accounts[0] });
      // console.log('update string success!')
      // console.log('ok: ', ok)

      // const currentString = await this.state.ethDropCoreInstance.methods.getString().call();
      // console.log('string: ', currentString)
      // this.setState({ currentString });

      await this.state.ethDropCoreInstance.methods.setCFO(this.state.newCFOInputValue).send({ from: this.state.accounts[0] });
      console.log('update CFO success!')

      const currentCFO = await this.state.ethDropCoreInstance.methods.getCFO().call({ from: this.state.accounts[0] });
      console.log('currentCFO ', currentCFO)
      this.setState({ currentCFO, newCFOInputValue: '' });
    }
    catch (err) {

      console.log('update CFO failed...', err);

      this.setState({ errorToDisplay: err });
    }
  }

  // async newGroupHandleSubmit(event) {
  //   event.preventDefault();

  //   try {
  //     const createdGroup = await this.state.ethDropCoreInstance.methods.createNewGroup(this.state.newGroupInputValue).send({ from: this.state.accounts[0] });
  //     console.log('created Group! ', createdGroup)
  //     this.setState({ createdGroup });
  //   }
  //   catch (err) {

  //     console.log('createGroup failed...', err);

  //     this.setState({ createGroupErrorToDisplay: err });
  //   }
  // }

  async newGroupSubmit2(event) {
    event.preventDefault();

    try {
      const createdGroup = await this.state.ethDropCoreInstance.methods.createNewGroup(this.state.newGroupInputValue2).send({ from: this.state.accounts[0] });
      console.log('created Group! ', createdGroup)
      this.setState({ createdGroup, newGroupInputValue2: '' });

    }
    catch (err) {

      console.log('createGroup failed...', err);

      this.setState({ createGroupErrorToDisplay: err });
    }
  }

  newGroupChange2(event) {
    this.setState({ newGroupInputValue2: event.target.value });
  }

  newCOOHandleChange(event) {
    this.setState({ newCOOInputValue: event.target.value });
  }

  newCFOHandleChange(event) {
    this.setState({ newCFOInputValue: event.target.value });
  }

  async pauseEntireApp(event) {
    try {
      const createdGroup = await this.state.ethDropCoreInstance.methods.pause().send({ from: this.state.accounts[0] });
      console.log('paused app! ', createdGroup)

      const isPaused = await this.state.ethDropCoreInstance.methods.isPaused().call({ from: this.state.accounts[0] });
      console.log('isPaused ', isPaused)
      this.setState({ isPaused });
    }
    catch (err) {

      console.log('createGroup failed...', err);

      this.setState({ createGroupErrorToDisplay: err });
    }
  }

  async unpauseEntireApp(event) {
    try {
      console.log('calling unpause:')
      const unpauseResponse = await this.state.ethDropCoreInstance.methods.unpause().send({ from: this.state.accounts[0] });
      console.log('unpaused app! ', unpauseResponse);

      const isPaused = await this.state.ethDropCoreInstance.methods.isPaused().call({ from: this.state.accounts[0] });
      console.log('isPaused ', isPaused)
      this.setState({ isPaused });
    }
    catch (err) {
      console.log('createGroup failed...', err);
      this.setState({ ceoPausingErrorToDisplay: err });
    }
  }

  // newGroupHandleChange(event) {
  //   this.setState({ newGroupInputValue: event.target.value });
  // }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and simpleStorageInstance...</div>;
    }
    return (
      <div className="App">
        <br />
        <h1>Welcome to Eth Drop!</h1>
        <br />
        <p>An awesome dapp where you can run and participate in ether airdrops!</p>
        <br />
        <p>Below is the full list of groups running EthDrop events.</p>
        <br />
        <br />

        {!this.state.groupNames && <div>Loading groups...</div>}
        {this.state.groupNames && <div>

          <h1>
            Groups
          </h1>
          <p>
            {JSON.stringify(this.state.groupNames)}
          </p>

          <ul>

            {this.state.groupNames.map((groupName, i) => {
              return <li key={this.state.groupIds[i]} >
                <Link style={{ textDecoration: 'none' }} to={`/g/${groupName}/${this.state.groupIds[i]}`}>{groupName} - {this.state.groupIds[i]}</Link>
              </li>

            })}

          </ul>

        </div>}

        <br />
        <br />
        <br />
        <br />
        {/* <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div> */}

        {/* {console.log(this.state)} */}

        {/* <p>
          whoami:
          {this.state.whoami}
        </p> */}
        {/* <p>
          string:
          {JSON.stringify(this.state.isCEO)}
        </p> */}


        {/*       Exectives Access Control Stuff      */}


        {this.state.isCEO &&
          <div style={{ margin: "2vw", padding: "20px", border: "solid black 2px", borderRadius: "20px" }}>

            <h2>You are the CEO!</h2>
            <p>You can set the CFO and COO addresses here.</p>

            <br />
            <br />
            <p>
              ok: {this.state.currentString}
            </p>
            <br />
            <br />
            <p>Current CFO: {this.state.currentCFO}</p>
            <br />
            <form onSubmit={this.newCFOHandleSubmit}>
              <label>
                New CFO:
                <input type="text" value={this.state.newCFOInputValue} onChange={this.newCFOHandleChange} />
              </label>
              <input type="submit" value="Submit" />

              <button onClick={this.newCFOHandleSubmit}>Submit </button>
            </form>

            <br />
            <br />
            <p>Current COO: {this.state.currentCOO}</p>
            <br />
            <br />
            <form onSubmit={this.newCOOHandleSubmit}>
              <label>
                New COO:
                <input type="text" value={this.state.newCOOInputValue} onChange={this.newCOOHandleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>

            <br />

            <br />

            {this.state.isPaused && <div>
              <h2>EthDrop is currently PAUSED.</h2>
              <br />
              <br />
              <p>
                You can unpause it since you are the CEO.
              </p>
              <br />
              <button onClick={this.unpauseEntireApp} style={{ backgroundColor: "lightgreen", padding: "20px" }}>
                UNPAUSE
              </button>

              <p>

                {this.state.ceoPausingErrorToDisplay}
              </p>
            </div>
            }

            {!this.state.isPaused && <div>
              <h2>EthDrop is currently LIVE.</h2>
              <br />
              <br />
              <p>
                You can pause it since you are the CEO.
              </p>
              <p>
                Warning- pausing the app makes it unusable for everyone until unpaused!
              </p>
              <br />
              <button onClick={this.pauseEntireApp} style={{ backgroundColor: "pink", padding: "20px" }}>
                PAUSE
              </button>
              <br />
              <br />
              <br />
            </div>
            }

            {this.state.errorToDisplay &&
              <h3 style={{ color: "darkred" }} >
                {JSON.stringify(this.state.errorToDisplay, null, 2)}
              </h3>}

          </div>}
        {!this.state.isCEO && <div>You are NOT the CEO.</div>}

        <br />
        <br />

        {this.state.isCFO &&
          <div style={{ margin: "2vw", padding: "20px", border: "solid black 2px", borderRadius: "20px" }}>

            <h1>
              You are the CFO!
            </h1>

            Current Balance: {this.state.currentCfoBalance}

          </div>}
        {!this.state.isCFO && <div>You are NOT the CFO.</div>}

        <br />

        {this.state.isCOO &&
          <div style={{ margin: "2vw", padding: "20px", border: "solid black 2px", borderRadius: "20px" }}>

            <h1>
              You are the COO!
            </h1>

            <p>You can create new groups here.</p>
            <br />
            <br />

            {/* <form onSubmit={this.newGroupSubmit}> */}
            {/* <label> */}
            {/* New Group Name: */}
            {/* <input type="text" value={this.state.newGroupInputValue} onChange={this.newGroupHandleChange} /> */}

            {/* </label> */}
            {/* <input type="submit" value="Submit" /> */}
            {/* </form> */}

            <form onSubmit={this.newGroupSubmit2}>
              <label>
                New Group Name:&nbsp;
                <input type="text" value={this.state.newGroupInputValue2} onChange={this.newGroupChange2} />
              </label>
              <input type="submit" value="Submit" />
            </form>

            <br />
            <br />


          </div>}
        {!this.state.isCOO && <div>You are NOT the COO.</div>}

        <br />
        <br />
        <br />

      </div>
    );
  }
}

export default Home;
