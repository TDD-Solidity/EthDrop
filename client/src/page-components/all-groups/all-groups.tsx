import React from 'react';
import { connect } from 'react-redux'
import { ReactReduxContext } from 'react-redux'


type IState = {
    todos: any[]
    groups: any[]
}

class AllGroupsPageComponent extends React.Component {

    state: IState

    constructor(props) {
      super(props)
      this.state = {
        todos: [],
        groups: []
      }
    }

    render() {
        return <ReactReduxContext.Consumer>
          {({ store }) => {
            // do something useful with the store, like passing it to a child
            // component where it can be used in lifecycle methods

            console.log('this.store ', store)
            // console.log('this.store ', )

            store.subscribe(() => {
              console.log('ok')

              console.log(store.getState().todosReducer.todos)
              console.log(store.getState().groupsReducer.groups)

              this.setState({
                ...this.state,
                todos: store.getState().todosReducer.todos,
                groups: store.getState().groupsReducer.groups,
              })
            })

            return (
              <div className="intro">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-12">
                      <br />
                      <br />

                      <div className="container">
                        <h1>All Groups</h1>
                        <p>Each airdrop is run by a specific group.</p>
                        <br />
                        <p>
                          Contact the group admins to be added as an eligible
                          recipient of that group's airdrops.
                        </p>
                        <br />

                        <h1>Todos</h1>
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
                            {/* {JSON.stringify(this.state.todos)} */}

                            {this.state.todos.map((todo, i) => {
                              return (
                                <tr key={"row--" + i}>
                                  <td>___</td>
                                  <td>{todo.id}</td>
                                  <td>{todo.title}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>

                        <br />
                        <br />

                        <h1>Groups</h1>
                        <br />
                        <table className="table table-striped table-border table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">First</th>
                              <th scope="col">Last</th>
                              <th scope="col">Handle</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {JSON.stringify(this.state.todos)} */}

                            {this.state.groups.map((group, i) => {
                              return (
                                <tr key={"row-" + i}>
                                  <td>___</td>
                                  <td>{group.name}</td>
                                  <td>{JSON.stringify(group)}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>

                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }}
        </ReactReduxContext.Consumer>
    }
  
    
}

const mapStateToProps = (state: any) => {
    // const mapStateToProps = (state: IState) => {
    return {
        todos: state.todosReducer.todos,
        // userId: state.loginReducer.userId,
    }
}

export default connect(mapStateToProps)(AllGroupsPageComponent)
