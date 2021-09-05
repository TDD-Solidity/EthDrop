
import { ReactReduxContext } from 'react-redux'
import React from 'react';

class CreateGroupPageComponent extends React.Component {

    state: any

    unsubscribe: any = undefined

    constructor(props) {
        super(props);

        this.state = {
            store: undefined,
            isCEO: false,
            isCOO: false,
            isCFO: false,
            isPaused: false,
            groupNames: [],
            groupIds: [],
            newGroupInputValue2: '',
            ethDropCoreSignerInstance: undefined
        }

        this.newGroupChange2 = this.newGroupChange2.bind(this);
        this.newGroupSubmit2 = this.newGroupSubmit2.bind(this);
    }

    async newGroupSubmit2(event) {
        event.preventDefault();

        try {
            const createdGroup = await this.state.ethDropCoreSignerInstance.createNewGroup(this.state.newGroupInputValue2);
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
                        const ethDropCoreSignerInstance = store.getState()?.web3Reducer.ethDropCoreSignerInstance

                        this.setState({
                            ...this.state,
                            store,
                            isCEO,
                            isCOO,
                            isCFO,
                            isPaused,
                            groupNames,
                            groupIds,
                            ethDropCoreSignerInstance
                        })

                    }
                })

                return (

                    <div className="container">
                        <h1>Create Group Page</h1>
                        <p>This page allows the contract owner(s) to add new groups.</p>
                        <br />
                        <br />
                        <h2>Your Group Proposals</h2>

                        <br />
                        <table className="table table-striped table-border table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>

                        <br />
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
                                            <button onClick={this.newGroupSubmit2} type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Create New Group
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <br />
                                <br />

                            </div>}
                        {!this.state.isCOO && <div>You are NOT the COO.</div>}

                    </div>
                );
            }}
        </ReactReduxContext.Consumer>
    }

    async componentWillUnmount() {

        return new Promise(async resolve => {

            console.log('unsub is: ', this.unsubscribe)

            await this.unsubscribe();

            resolve(undefined);
        })
    }
}

export default CreateGroupPageComponent;