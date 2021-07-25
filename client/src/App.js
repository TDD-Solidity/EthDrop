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

import Home from "./HomePage"
import GroupEventPage from "./GroupEventPage"

import "./App.css";


function stringToHex(string) {
  var hex, i;

  var result = "";
  for (i = 0; i < string.length; i++) {
    hex = string.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result
}

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
    newCOOInputValue: ''
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

      const deployedNetwork = SimpleStorageContract.networks[networkId];
      console.log('address: ', deployedNetwork.address);

      const simpleStorageInstance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        // env.SIMPLE_STORAGE_CONTRACT_ADDRESS
        // ,
        deployedNetwork && deployedNetwork.address,
      );

      const ethDropCoreInstance = new web3.eth.Contract(
        EthDropCore.abi,
        // env.ETHDROP_CORE_CONTRACT_ADDRESS
        // ,
        deployedNetwork && deployedNetwork.address,
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, simpleStorageInstance, ethDropCoreInstance });
    
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {

    return <Router>
      <div style={{ backgroundColor: 'blue', padding: '2px 2px 2px 20px', color: "lightgreen" }}>
        <h1>EthDrop</h1>
      </div>
      <div>
        <nav style={{
          display: "flex", flexDirection: "row", justifyContent: "space-between",
          padding: "1px 20px", alignItems: "center"
        }}>
          {/* <li> */}
          <h2 >
            <Link style={{ textDecoration: 'none' }} to="/">Groups</Link>
          </h2>
          <button style={{ height: "50px" }} onClick={() => alert("Metamask connected")}>
            Connect Metamask
          </button>
        </nav>

        <hr />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/g/:groupName/:groupId" exact render= {routeProps =><GroupEventPage {...routeProps} key={document.location.href} />} >
          </Route>
          <Route path="/" key={document.location.href} >
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>

  }

  
}

export default App;
