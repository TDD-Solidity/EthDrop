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

import { FillButton } from 'tailwind-react-ui';
import { shortenedAddress } from './shortened-address';

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

  async componentDidMount() {

    console.log('^^ Home page mounting!')

    try {
      //   // Get network provider and web3 instance.
      console.log('^^ calling web3...')
      const web3 = await getWeb3();
      console.log('^^ done calling web3...')

      //   // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      const foo = new Promise((resolve => resolve('fobarrrr')));

      await foo;

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

      const ok = { web3 }
      // const ok = { accounts, ethDropCoreInstance, web3 }

      this.setState({ ...this.state, web3, ethDropCoreInstance, accounts });

      console.dir(this.state)

      console.log('^^ home page done mounting!')
      await this.runExample();

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  };

  componentWillUnmount() {
    // window.removeEventListener('load', async () => {})
  }

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

    const currentAddressShortened = whoami ? whoami.substr(0, 6) + '...' + whoami.substr(whoami.length - 5) : '';

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




    // ethDropCoreInstance.GroupCreated.watch((creator, groupId) => {
    //   console.log('heard an event for some shit "on" syntax: ' + creator + groupId)
    // })


    ethDropCoreInstance.events.GroupCreated().on('data', async function (event) {
      console.log('woah! ', event.returnValues.groupId, event.returnValues.creator)
    })

    ethDropCoreInstance.events.allEvents((err, eventObj) => {
      console.log('EVENT!! ', eventObj.event);
      console.log('yerp! ', eventObj.returnValues.groupId, eventObj.returnValues.creator)


    })




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

        {/* Welcome Section */}
        <div className="my-10">

          <h1>Welcome to Eth Drop!</h1>

          <p>An awesome dapp where you can run and participate in ether airdrops!</p>

        </div>

        <hr />

        {/* Groups Section */}
        <div className="my-10 mx-5">
          {!this.state.groupNames && <div>Loading groups...</div>}
          {this.state.groupNames && <div>

            <h1>
              Groups
            </h1>

            {this.state.groupNames && this.state.groupNames.length < 1 && <p>
              There are no groups yet- only the COO can create groups!
            </p>
            }

            {this.state.groupNames && this.state.groupNames.length >= 1 && 
            <table className="table-fixed border border-blue-200 border-8 min-w-full my-10 rounded">

              <thead>
                <tr >
                  <th className="w-3/4 p-2 border-4 border-blue-200">Name</th>
                  <th className="w-1/4 p-2 border-4 border-blue-200">More Details...</th>
                </tr>
              </thead>
              <tbody>

                {this.state.groupNames.map((groupName, i) => {
                  return <tr key={this.state.groupIds[i]}>

                    <td className="border-4 border-blue-200">{`${groupName} - ${this.state.groupIds[i]}`}</td>

                    <td className="border-4 border-blue-200">

                      <FillButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 my-4 rounded">
                        <h4>
                          <Link style={{ textDecoration: 'none' }} to={`/g/${groupName}/${this.state.groupIds[i]}`}>View</Link>
                        </h4>
                      </FillButton>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>}

            {/* <table className="table-fixed mx-4 border border-blue-200 border-8 rounded">
              <thead>
                <tr>
                  <th className="w-1/2 border-4 border-blue-200">Title</th>
                  <th className="w-1/4 border-4 border-blue-200">Author</th>
                  <th className="w-1/4 border-4 border-blue-200">Views</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-4 border-blue-200">Intro to CSS</td>
                  <td className="border-4 border-blue-200">Adam</td>
                  <td className="border-4 border-blue-200">858</td>
                </tr>
                <tr className="bg-blue-200">
                  <td className="border-4 border-blue-400">A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
                  <td className="border-4 border-blue-200">Adam</td>
                  <td className="border-4 border-blue-200">112</td>
                </tr>
                <tr>
                  <td className="border-4 border-blue-200">Intro to JavaScript</td>
                  <td className="border-4 border-blue-200">Chris</td>
                  <td className="border-4 border-blue-200">1,280</td>
                </tr>
              </tbody>
            </table>

            <table className="border-4 border border-green-800">
              <thead>
                <tr>
                  <th className="border border-8 border-green-600 ...">State</th>
                  <th className="border border-4 border-green-600 ...">City</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-600 ...">Indiana</td>
                  <td className="border border-green-600 ...">Indianapolis</td>
                </tr>
                <tr>
                  <td className="border border-green-600 ...">Ohio</td>
                  <td className="border border-green-600 ...">Columbus</td>
                </tr>
                <tr>
                  <td className="border border-green-600 ...">Michigan</td>
                  <td className="border border-green-600 ...">Detroit</td>
                </tr>
              </tbody>
            </table>

            <table className="table-auto border-separate border border-green-900">
              <thead>
                <tr>
                  <th className="border border-green-600">Frameworks</th>
                  <th className="border border-green-600">About</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-600">Tailwind CSS</td>
                  <td className="border border-green-600">
                    Tailwind CSS is a highly customizable,
                    low-level CSS framework that gives you all
                    of the building blocks
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600">Bulma</td>
                  <td className="border border-green-600">
                    Bulma CSS by @jgthms is just perfect.
                    Simple, easily customizable and doesn't
                    impose Javascript implementations.
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600">Bootstrap</td>
                  <td className="border border-green-600">
                    Bootstrap is a free and open-source CSS
                    framework directed at responsive, mobile-first
                    front-end web development.
                  </td>
                </tr>
              </tbody>
            </table> */}

          </div>}

        </div>
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
          <div className="mx-5 my-10 p-10 border-4 border-blue-200 rounded" >

            <h2>You are the CEO!</h2>
            <p>You can set the CFO and COO addresses here.</p>


            {/* <form onSubmit={this.newCFOHandleSubmit}>
              <label>
              New CFO:
              <input type="text" value={this.state.newCFOInputValue} onChange={this.newCFOHandleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form> */}

            <div className="w-full max-w-m">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.newCFOHandleSubmit}>

                <div className="mb-6">

                  <div className='has-tooltip'>
                    <div className='tooltip rounded shadow-lg p-1 pb-5 bg-gray-100 text-red-500 m-2 mb-6 h-4'>{this.state.currentCFO}</div>
                    <p>Current CFO:&nbsp;&nbsp;{shortenedAddress(this.state.currentCFO)}</p>
                  </div>

                  <label className="block text-gray-700 text-sm font-bold mb-2 my-4" htmlFor="new-ceo">
                    <div className="my-4">
                      Update CFO here:
                    </div>
                  </label>
                  <input className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="new-cfo" type="text" placeholder="0x1234..." value={this.state.newCFOInputValue} onChange={this.newCFOHandleChange} />
                  {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="flex items-center justify-center">

                  <button onClick={this.newCFOHandleSubmit} type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Set New CFO
                  </button>
                  {/* <input type="submit" value="Submit"/> */}

                  {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                  </a> */}
                </div>
              </form>
              {/* <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
              </p> */}
            </div>



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

              <FillButton onClick={this.unpauseEntireApp} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mx-2 my-4 rounded">
                <h4>
                  UNPAUSE
                </h4>
              </FillButton>

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

              <FillButton onClick={this.pauseEntireApp} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 mx-2 my-4 rounded">
                <h4>
                  PAUSE
                </h4>
              </FillButton>

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

            <div className="w-full max-w-m">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.newGroupSubmit2}>

                <div className="mb-6">

                  {/* <div className='has-tooltip'>
                    <div className='tooltip rounded shadow-lg p-1 pb-5 bg-gray-100 text-red-500 m-2 mb-6 h-4'>{this.state.currentCFO}</div>
                    <p>Current CFO:&nbsp;&nbsp;{shortenedAddress(this.state.currentCFO)}</p>
                  </div> */}

                  <label className="block text-gray-700 text-sm font-bold mb-2 my-4" htmlFor="new-ceo">
                    <div className="my-4">
                      Add new group here:
                    </div>
                  </label>
                  <input className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="new-cfo" type="text" placeholder="0x1234..." value={this.state.newCFOInputValue} onChange={this.newCFOHandleChange} />
                  {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="flex items-center justify-center">

                  <button onClick={this.newCFOHandleSubmit} type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Set New CFO
                  </button>
                  {/* <input type="submit" value="Submit"/> */}

                  {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                  </a> */}
                </div>
              </form>
              {/* <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
              </p> */}
            </div>

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
