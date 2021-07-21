import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import EthDropCore from "./contracts/EthDropCore.json";
import getWeb3 from "./getWeb3";
import env from "react-dotenv";

import "./App.css";

class App extends Component {
  state = { 
    storageValue: 0, 
    web3: null, 
    accounts: null, 
    contract: null, 
    simpleStorageInstance: null,
    ethDropCoreInstance: null,
    isCEO: null,
    isCFO: null,
    isCOO: null,
    groupNames: [],
    groupIds: []
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // const accounts = window.ethereum.request("eth_requestAccounts")
      console.log('accounts are: ', accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      console.log('network is: ', networkId);

      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // console.log('address: ', deployedNetwork.address);

      console.log('ok: ', env.CONTRACT_ADDRESS)
      console.log('ok: ', env.SIMPLE_STORAGE_CONTRACT_ADDRESS)

      const simpleStorageInstance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        env.SIMPLE_STORAGE_CONTRACT_ADDRESS
        // ,
        // deployedNetwork && deployedNetwork.address,
      );

      const ethDropCoreInstance = new web3.eth.Contract(
        EthDropCore.abi,
        env.ETHDROP_CORE_CONTRACT_ADDRESS
        // ,
        // deployedNetwork && deployedNetwork.address,
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, simpleStorageInstance, ethDropCoreInstance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, simpleStorageInstance, ethDropCoreInstance } = this.state;

    // Stores a given value, 5 by default.
    await simpleStorageInstance.methods.set(5).send({ from: accounts[0] });

    // Get the value from the simpleStorageInstance to prove it worked.
    const response = await simpleStorageInstance.methods.get().call();
    
    // Update state with the result.
    this.setState({ storageValue: response });
    
    // Get the value from the simpleStorageInstance to prove it worked.
    const fooResponse = await ethDropCoreInstance.methods.foobar().call();
    
    // const fooResponse = await ethDropCoreInstance.methods.foobar().call();

    const isCEO = await ethDropCoreInstance.methods.isCEO().call();
    console.log('isCEO ', isCEO)
    this.setState({ isCEO });

    const isCOO = await ethDropCoreInstance.methods.isCOO().call();
    console.log('isCOO ', isCOO)
    this.setState({ isCOO });

    const isCFO = await ethDropCoreInstance.methods.isCFO().call();
    console.log('isCFO ', isCFO)
    this.setState({ isCFO });

    const groupIds = await ethDropCoreInstance.methods.getGroupIds().call();
    console.log('groupIds: ', groupIds)
    this.setState({ groupIds });

    const groupNames = await ethDropCoreInstance.methods.getGroupNames().call();
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

    console.log('fooResponse: ', fooResponse);

  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and simpleStorageInstance...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      
        {console.log(this.state)}

        <p>
      string: 
        {JSON.stringify(this.state.isCEO)}
        </p>

        {this.state.isCEO && <div>You are the CEO!</div>}
        {!this.state.isCEO && <div>You are NOT the CEO.</div>}
      
        <br/>
        {this.state.isCFO && <div>You are the CFO!</div>}
        {!this.state.isCFO && <div>You are NOT the CFO.</div>}
        
        <br/>
      
        {this.state.isCOO && <div>You are the COO!</div>}
        {!this.state.isCOO && <div>You are NOT the COO.</div>}
        
        <br/>

        {!this.state.groupNames && <div>Loading groups...</div>}
        {this.state.groupNames && <div>

          <h1>
          Groups
          </h1>
          <p>
          {JSON.stringify(this.state.groupNames)}
          </p>
          </div>}
      
      </div>
    );
  }
}

export default App;
