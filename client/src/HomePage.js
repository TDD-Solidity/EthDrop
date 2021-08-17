import React, { Component } from "react";
import EthDropCore from "./contracts/EthDropCore.json";
import getWeb3 from "./getWeb3";
import {
  HashRouter as Router,
  Link,
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
    ceoPausingErrorToDisplay: null,
    currentNetwork: '',
    showMainnetErrorMessage: false
  };

  async componentDidMount() {

    try {

      const web3 = await getWeb3();

      const currentNetwork = await web3.eth.net.getNetworkType()


      const accounts = await web3.eth.getAccounts();

      const foo = new Promise((resolve => resolve('fobarrrr')));

      await foo;

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EthDropCore.networks[networkId];

      if (currentNetwork === 'main') {
        this.setState({ showMainnetErrorMessage: true });
        this.setState({ ...this.state, showMainnetErrorMessage: true });
      }
      else {

        const ethDropCoreInstance = new web3.eth.Contract(
          EthDropCore.abi,
          deployedNetwork && deployedNetwork.address,
        );

        const ok = { web3 }

        this.setState({ ...this.state, web3, ethDropCoreInstance, accounts, currentNetwork, showMainnetErrorMessage: false });

        console.dir(this.state)

        console.log('^^ home page done mounting!')
        await this.runExample();
      }

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  };

  componentWillUnmount() {

  }

  async checkIfImCFO() {

    const isCFO = await this.state.ethDropCoreInstance.methods.isCFO().call({ from: this.state.accounts[0] });
    console.log('isCFO ', isCFO)
    this.setState({ isCFO });
  }

  async checkIfImCOO() {

    const isCOO = await this.state.ethDropCoreInstance.methods.isCOO().call({ from: this.state.accounts[0] });
    console.log('isCOO ', isCOO)
    this.setState({ isCOO });
  }

  async checkIsPaused() {
    const isPaused = await this.state.ethDropCoreInstance.methods.isPaused().call({ from: this.state.accounts[0] });
    console.log('isPaused ', isPaused)
    this.setState({ isPaused });
  }

  async getGroups() {

    const groupIds = await this.state.ethDropCoreInstance.methods.getGroupIds().call({ from: this.state.accounts[0] });
    console.log('groupIds: ', groupIds)
    this.setState({ groupIds });

    const groupNames = await this.state.ethDropCoreInstance.methods.getGroupNames().call({ from: this.state.accounts[0] });
    console.log('groupNames: ', groupNames)
    this.setState({ groupNames });

  }

  runExample = async () => {
    const { accounts, ethDropCoreInstance } = this.state;

    const whoami = await ethDropCoreInstance.methods.whoami().call({ from: this.state.accounts[0] });
    console.log('whoami ', whoami)
    this.setState({ whoami });

    const currentAddressShortened = whoami ? whoami.substr(0, 6) + '...' + whoami.substr(whoami.length - 5) : '';

    await this.checkIsPaused();

    const isCEO = await ethDropCoreInstance.methods.isCEO().call({ from: this.state.accounts[0] });
    console.log('isCEO ', isCEO)
    this.setState({ isCEO });

    const currentCOO = await ethDropCoreInstance.methods.getCOO().call({ from: this.state.accounts[0] });
    console.log('currentCOO ', currentCOO)
    this.setState({ currentCOO });

    await this.checkIfImCFO();
    await this.checkIfImCOO();

    const currentCFO = await ethDropCoreInstance.methods.getCFO().call({ from: this.state.accounts[0] });
    console.log('currentCFO ', currentCFO)
    this.setState({ currentCFO });

    const currentCfoBalance = 0;

    await this.getGroups();

    ethDropCoreInstance.events.GroupCreated().on('data', async (event) => {
      console.log('woah! ', event.returnValues.groupId, event.returnValues.creator);

      console.log('group created! ')
      this.setState({
        ...this.state,
        groupNames: [event.returnValues.creator, ...this.state.groupNames],
        groupIds: [event.returnValues.groupId, ...this.state.groupIds],
      })
    })

    ethDropCoreInstance.events.AdminAdded().on('data', async (event) => {
      console.log('admin added! ', event.returnValues);

    })

    ethDropCoreInstance.events.GroupCreated().on('data', async (event) => {
      console.log('groupCreated! ', event.returnValues);

    })

    ethDropCoreInstance.events.allEvents(async (err, eventObj) => {
      console.log('EVENT!! ', eventObj.event);
      console.log('yerp! ', eventObj.returnValues.groupId, eventObj.returnValues.groupName);
      console.log('yerp! ', eventObj.returnValues);

      switch (eventObj.event) {

        case 'CooUpdated':

          await this.checkIfImCOO();

          break;

        case 'CfoUpdated':

          await this.checkIfImCFO();

          break;

        case 'GroupCreated':

          await this.getGroups();
          break;

        case 'AppPaused':

          await this.checkIsPaused();
          break;

        default:
          console.log(`UNHANDLED EVENT!! : ${eventObj.event}`);

      }

    })

  };

  async newCOOHandleSubmit(event) {
    event.preventDefault();
    console.log('newCOOHandleSubmit: ' + this.state.newCOOInputValue.trim());
    console.log('hex: ', this.state.newCOOInputValue);

    try {
      await this.state.ethDropCoreInstance.methods.setCOO(this.state.newCOOInputValue).send({ from: this.state.accounts[0] });
      console.log('update COO success!')

      const currentCOO = await this.state.ethDropCoreInstance.methods.getCOO().call({ from: this.state.accounts[0] });
      console.log('currentCOO ', currentCOO)
      this.setState({ currentCOO, newCOOInputValue: '', errorToDisplay: '' });
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

      await this.state.ethDropCoreInstance.methods.setCFO(this.state.newCFOInputValue).send({ from: this.state.accounts[0] });
      console.log('update CFO success!')

      const currentCFO = await this.state.ethDropCoreInstance.methods.getCFO().call({ from: this.state.accounts[0] });
      console.log('currentCFO ', currentCFO)
      this.setState({ currentCFO, newCFOInputValue: '', errorToDisplay: '' });
    }
    catch (err) {
      console.log('update CFO failed...', err);
      this.setState({ errorToDisplay: err });
    }
  }

  async newGroupSubmit2(event) {
    event.preventDefault();

    try {
      const createdGroup = await this.state.ethDropCoreInstance.methods.createNewGroup(this.state.newGroupInputValue2).send({ from: this.state.accounts[0] });
      console.log('created Group! ', createdGroup)
      this.setState({ createdGroup, newGroupInputValue2: '', createGroupErrorToDisplay: '' });

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

  render() {
    if (this.state.showMainnetErrorMessage) {
      return <div className="w-100 text-center m-10">
        <h1>
          Whoops!
        </h1>
        <p>
          Looks like you are connected to Mainnet.
        </p>
        <p>
          Please go to your wallet and change the network to rinkeby!
        </p>
      </div>;
    }
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

        <br />
        <br />

        {this.state.isCEO &&
          <div className="mx-5 my-10 p-10 border-4 border-blue-200 rounded" >

            <h2>You are the CEO!</h2>
            <p>You can set the CFO and COO addresses here.</p>

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
                  <input className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="new-cfo" type="text" placeholder="0x1234..." value={this.state.newCFOInputValue} onChange={this.newCFOHandleChange} />
                </div>
                <div className="flex items-center justify-center">

                  <button onClick={this.newCFOHandleSubmit} type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Set New CFO
                  </button>

                </div>
              </form>

            </div>

            <div className="w-full max-w-m">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.newCOOHandleSubmit}>

                <div className="mb-6">

                  <div className='has-tooltip'>
                    <div className='tooltip rounded shadow-lg p-1 pb-5 bg-gray-100 text-red-500 m-2 mb-6 h-4'>{this.state.currentCOO}</div>
                    <p>Current COO:&nbsp;&nbsp;{shortenedAddress(this.state.currentCOO)}</p>
                  </div>

                  <label className="block text-gray-700 text-sm font-bold mb-2 my-4" htmlFor="new-ceo">
                    <div className="my-4">
                      Update COO here:
                    </div>
                  </label>
                  <input className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="new-cfo" type="text" placeholder="0x1234..." value={this.state.newCOOInputValue} onChange={this.newCOOHandleChange} />
                </div>
                <div className="flex items-center justify-center">

                  <button onClick={this.newCOOHandleSubmit} type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Set New COO
                  </button>

                </div>
              </form>
            </div>

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

            <p>
              Current contract eth balance: {this.state.currentCfoBalance}
            </p>

          </div>}
        {!this.state.isCFO && <div>You are NOT the CFO.</div>}

        <br />

        {this.state.isCOO &&
          <div style={{ margin: "2vw", padding: "20px", border: "solid black 2px", borderRadius: "20px" }}>

            <h1>
              You are the COO!
            </h1>

            <p>You can create new groups here.</p>

            <div className="w-full max-w-m">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.newGroupSubmit2}>

                <div className="mb-6">

                  <label className="block text-gray-700 text-sm font-bold mb-2 my-4" htmlFor="new-ceo">
                    <div className="my-4">
                      Add new group here:
                    </div>
                  </label>
                  <input className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="new-cfo" type="text" placeholder="Cool New Group!" value={this.state.newGroupInputValue2} onChange={this.newGroupChange2} />
                </div>
                <div className="flex items-center justify-center">

                  <button onClick={this.newGroupSubmit2} type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Create New Group
                  </button>
                </div>
              </form>
            </div>

            <br />
            <br />

          </div>}
        {!this.state.isCOO && <div>You are NOT the COO.</div>}

        <br />
        <br />

        {/* Groups Section */}
        <div className="my-10 mx-5">
          {!this.state.groupNames && <div>Loading groups...</div>}
          {this.state.groupNames && <div>

            <h1>
              Groups
            </h1>

            {this.state.groupNames && (this.state.groupNames.length < 1) && <p>
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
                    return <tr key={i + this.state.groupIds[i]}>

                      <td className="border-4 border-blue-200">{`${groupName} - ${this.state.groupIds[i]}`}</td>

                      <td className="border-4 border-blue-200">

                        <FillButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 my-4 rounded">
                          <h4>
                            <Link style={{ textDecoration: 'none' }} to={`/EthDrop/g/${groupName}/${this.state.groupIds[i]}`}>View</Link>
                          </h4>
                        </FillButton>
                      </td>
                    </tr>
                  })}

                </tbody>
              </table>}

          </div>}

        </div>
        <br />

        <br />

      </div>
    );
  }
}

export default Home;
