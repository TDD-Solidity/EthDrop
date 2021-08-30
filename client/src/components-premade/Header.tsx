import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Menu from './Menu';
import Hamburger from './Hamburger';
import MenuMobile from './MenuMobile';
import EthDropCore from "./../contracts/EthDropCore.json";

type Props = {
  data: any
};

class Header extends React.Component<Props> {

  constructor(props: any) {
    super(props);
    this.state = {
      menuActive: false
    };
  }

  toggleMenu = menuActive => {

    this.setState((prevState: any) => ({
      menuActive: !prevState.menuActive
    }));

  };

  async getBlockNumber() {
    // console.log('Init web3')

    console.log('1')
    const web3 = new (window as any).Web3((window as any).ethereum)
    console.log('2', web3)
    // const web3 = new (window as any).Web3('https://cloudflare-eth.com')
    // await web3.eth.enable();
    // const currentBlockNumber = await web3.eth.getBlockNumber()
    
    const foo = await (window as any).ethereum.enable();
    console.log('3')
    
    const def = await (window as any).ethereum.defaultAccount;
    console.log('4')
    
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.defaultAccount;
    
    
    // const accounts = window.ethereum.request("eth_requestAccounts")
    console.log('accounts are: ', foo);
    // console.log('accounts are: ', def);
    // console.log('accounts are: ', accounts);
    // console.log('accounts are: ', web3.eth.accounts.wallet);
    // console.log('accounts are: ', web3.eth.getAccounts());
    
    var account = web3.currentProvider.selectedAddress
    console.log('account are: ', account);

    if (account) {
      
      // const deployedNetwork = await web3.eth.net.getNetworkType()
      
      
      const id = await web3.eth.net.getId();
      const deployedNetwork = EthDropCore.networks[id];

      console.log('current network: ', deployedNetwork);
      console.log('current network: ', deployedNetwork.address);
      
      const ethDropCoreInstance = new web3.eth.Contract(
        (EthDropCore as any).abi,
        deployedNetwork && deployedNetwork.address,
        );
        
        const groupIds = await ethDropCoreInstance.methods.getGroupIds().call({ from: account });
        
        console.log('groupIds: ', groupIds)
    
        const groupNames = await ethDropCoreInstance.methods.getGroupNames().call({ from: account });
        
        console.log('groupNames: ', groupNames)
    }

    // console.log('account are: ', web3.eth.accounts[0]);
    
    // const forks = await (window as any).ethereum.getAccounts();

    
        
    // const accounts = web3.eth.getAccounts((accounts) => {
    //   console.log('accounts: ', accounts)
    // })
    // setBlockNr(currentBlockNumber)

    // const deployedNetwork = await web3.eth.net.getNetworkType()

    // const ethDropCoreInstance = new web3.eth.Contract(
    //   (EthDropCore as any).abi,
    //   deployedNetwork && deployedNetwork.address,
    // );

    // const groupIds = await ethDropCoreInstance.methods.getGroupIds().call({ from: accounts[0] });
    // const groupIds = await ethDropCoreInstance.methods.getGroupIds().call({ from: accounts[0] });
    // console.log('groupIds: ', groupIds)
    // this.setState({ groupIds });

    // const groupNames = await ethDropCoreInstance.methods.getGroupNames().call({ from: accounts[0] });
    // const groupNames = await ethDropCoreInstance.methods.getGroupNames().call();
    // console.log('groupNames: ', groupNames)
    // this.setState({ groupNames });



    //     // const groupIds = await this.state.ethDropCoreInstance.methods.getGroupIds().call({ from: this.state.accounts[0] });
    //     // console.log('groupIds: ', groupIds)
    //     // this.setState({ groupIds });

    //     // const groupNames = await this.state.ethDropCoreInstance.methods.getGroupNames().call({ from: this.state.accounts[0] });
    //     // console.log('groupNames: ', groupNames)
    //     // this.setState({ groupNames });


    // console.log('block num: ', currentBlockNumber)
    console.log('block num...')
  }

  render() {

    const config = (this.props as any).data.configJson;

    return (
      <div>

        <div className="header">
          <div className="container">
            <div className="logo">
              <Link to="/">
                <img height={config.logo.desktop_height} alt={config.logo.alt} src={config.logo.desktop} />
              </Link>
            </div>
            <div className="logo-mobile">
              <Link to="/">
                <img height={config.logo.desktop_height} alt={config.logo.alt} src={config.logo.mobile} />
              </Link>
            </div>
            <MenuMobile active={(this.state as any).menuActive} />
            <Menu />
            <Hamburger toggleMenu={this.toggleMenu} />
          </div>
        </div>
        <div className="header">

          <div className="container d-flex justify-content-end align-items-center">

            <h4 className="m-0" >(not connected)</h4>
            {/* <h4>(not connected)</h4> */}
            &nbsp;&nbsp;

            {/* <a href='/' className="button" onClick={this.getBlockNumber}>Connect Wallet</a> */}
            <button className="button" onClick={() => this.getBlockNumber()}>Connect Wallet</button>
          </div>
        </div>
      </div>
    );
  }
}

const props = () => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        configJson {
          logo {
            alt
            desktop
            mobile
            desktop_height
          }
        }
      }
    `}
    render={data => <Header data={data} />}
  />
);

export default props;
