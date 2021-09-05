import React from 'react';
import { connect } from 'react-redux'
import { ReactReduxContext } from 'react-redux'

import { shortenedAddress } from '../../services/shortened-address';


// type IState = {
//     todos: any[]
//     groups: any[],
//     isCOO: boolean,
//     newCFOInputValue: string,
//     newGroupInputValue: string,
//     ethDropCoreReadInstance: any,
//     ethDropCoreSignerInstance: any,
//     web3Reducer: any
// }

class AdminPanelPageComponent extends React.Component {

    state: any

    unsubscribe: any

    constructor(props) {
        super(props)

        this.state = {
            store: undefined,
            isCEO: false,
            isCOO: false,
            isCFO: false,
            isPaused: false,
            groupNames: [],
            groupIds: [],
            newCOOInputValue: '',
            newCFOInputValue: '',
        }

        // this.newGroupChange = this.newGroupChange.bind(this);
        // this.newGroupSubmit = this.newGroupSubmit.bind(this);
        // this.createGroup = this.createGroup.bind(this);

        this.unpauseEntireApp = this.unpauseEntireApp.bind(this);
        this.pauseEntireApp = this.pauseEntireApp.bind(this);

        this.newCOOHandleChange = this.newCOOHandleChange.bind(this);
        this.newCOOHandleSubmit = this.newCOOHandleSubmit.bind(this);
        this.newCFOHandleChange = this.newCFOHandleChange.bind(this);
        this.newCFOHandleSubmit = this.newCFOHandleSubmit.bind(this);
    }

    // async newGroupSubmit(event, store) {

    //     console.log('creating...')
    //     event.preventDefault();

    //     console.log('creating...')
    //     console.log('store.web3Reducer ', store)
    //     console.log('this.state ', this.state.web3Reducer)
    //     try {
    //         const createdGroup = await this.state.web3Reducer.ethDropCoreSignerInstance.createNewGroup(this.state.newGroupInputValue);
    //         console.log('created Group! ', createdGroup)
    //         this.setState({ createdGroup, newGroupInputValue: '', createGroupErrorToDisplay: '' });

    //     }
    //     catch (err) {
    //         console.log('createGroup failed...', err);
    //         this.setState({ createGroupErrorToDisplay: err });
    //     }
    // }

    // newGroupChange(event) {
    //     this.setState({ newGroupInputValue: event.target.value });
    // }

    async pauseEntireApp(event) {
        try {
            const pauseResponse = await this.state.ethDropCoreSignerInstance.pause();
            console.log('paused app! ', pauseResponse)

            // const isPaused = await this.state.ethDropCoreInstance.methods.isPaused().call({ from: this.state.accounts[0] });
            // console.log('isPaused ', isPaused)
            // this.setState({ isPaused });
        }
        catch (err) {

            console.log('createGroup failed...', err);

            this.setState({ createGroupErrorToDisplay: err });
        }
    }

    async unpauseEntireApp(event) {
        try {
            console.log('calling unpause:')
            const unpauseResponse = await this.state.ethDropCoreSignerInstance.unpause();
            console.log('unpaused app! ', unpauseResponse);

            // const isPaused = await this.state.ethDropCoreSignerInstance.isPaused();
            // console.log('isPaused ', isPaused)
            // this.setState({ isPaused });
        }
        catch (err) {
            console.log('createGroup failed...', err);
            this.setState({ ceoPausingErrorToDisplay: err });
        }
    }

    newCOOHandleChange(event) {
        this.setState({ newCOOInputValue: event.target.value });
    }

    newCFOHandleChange(event) {
        this.setState({ newCFOInputValue: event.target.value });
    }

    async newCOOHandleSubmit(event) {
        event.preventDefault();
        console.log('newCOOHandleSubmit: ' + this.state.newCOOInputValue.trim());
        console.log('hex: ', this.state.newCOOInputValue);

        try {
            await this.state.ethDropCoreSignerInstance.setCOO(this.state.newCOOInputValue)
            console.log('update COO success!')

            // const currentCOO = await this.state.ethDropCoreInstance.methods.getCOO().call({ from: this.state.accounts[0] });
            // console.log('currentCOO ', currentCOO)
            // this.setState({ currentCOO, newCOOInputValue: '', errorToDisplay: '' });
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

            await this.state.ethDropCoreSignerInstance.setCFO(this.state.newCFOInputValue);
            console.log('update CFO success!')

            // const currentCFO = await this.state.ethDropCoreInstance.methods.getCFO().call({ from: this.state.accounts[0] });
            // console.log('currentCFO ', currentCFO)
            // this.setState({ currentCFO, newCFOInputValue: '', errorToDisplay: '' });
        }
        catch (err) {
            console.log('update CFO failed...', err);
            this.setState({ errorToDisplay: err });
        }
    }

    render() {
        return <ReactReduxContext.Consumer>
            {({ store }) => {
                // do something useful with the store, like passing it to a child
                // component where it can be used in lifecycle methods

                console.log('this.store ', store)
                // console.log('this.store ', )

                this.unsubscribe = store.subscribe(() => {
                    console.log('ok')

                    console.log(store.getState().todosReducer.todos)
                    // console.log(store.getState().groupsReducer.groups)

                    if (store.getState()?.web3Reducer?.globalData) {

                        const isCEO = store.getState()?.web3Reducer?.globalData[0]
                        const isCOO = store.getState()?.web3Reducer?.globalData[1]
                        const isCFO = store.getState()?.web3Reducer?.globalData[2]
                        const isPaused = store.getState()?.web3Reducer?.globalData[3]
                        const groupNames = store.getState()?.web3Reducer?.globalData[4]
                        const groupIds = store.getState()?.web3Reducer?.globalData[5]
                        const ethDropCoreReadInstance = store.getState()?.web3Reducer?.ethDropCoreReadInstance
                        const ethDropCoreSignerInstance = store.getState()?.web3Reducer?.ethDropCoreSignerInstance

                        this.setState({
                            ...this.state,
                            store,
                            isCEO,
                            isCOO,
                            isCFO,
                            isPaused,
                            groupNames,
                            groupIds,
                            ethDropCoreReadInstance,
                            ethDropCoreSignerInstance

                        })

                    }
                })

                return (
                    <div className="intro">
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-12">
                                    <br />
                                    <br />

                                    <div className="container">
                                        <h1>Executive Admin Panel</h1>
                                        <p>Each airdrop is run by a specific group.</p>
                                        <br />
                                        <p>
                                            Contact the group admins to be added as an eligible
                                            recipient of that group's airdrops.
                                        </p>

                                        <br />
                                        <br />


                                    </div>
                                </div>
                            </div>


                            {/* CEO Panel */}


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

                                                <button onClick={this.newCFOHandleSubmit} type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

                                                <button onClick={this.newCOOHandleSubmit} type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

                                        <button onClick={this.unpauseEntireApp} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mx-2 my-4 rounded">
                                            <h4>
                                                UNPAUSE
                                            </h4>
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

                                        <button onClick={this.pauseEntireApp} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 mx-2 my-4 rounded">
                                            <h4>
                                                PAUSE
                                            </h4>
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
                            

                            {/* CFO Panel  */}
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


                        </div>
                    </div>
                )
            }
            }
        </ReactReduxContext.Consumer >
    }

    async componentWillUnmount() {

        return new Promise(async resolve => {

            console.log('unsub is: ', this.unsubscribe)
            
            await this.unsubscribe();

            resolve(undefined);
        })
    }

}

// const mapStateToProps = (state: any) => {
//     // const mapStateToProps = (state: IState) => {
//     return {
//         todos: state.todosReducer.todos,
//         // userId: state.loginReducer.userId,
//     }
// }

// export default connect(mapStateToProps)(AdminPanelPageComponent)
export default AdminPanelPageComponent
