import React, { useState } from 'react'
import Layout from '../components-premade/Layout'
import SEO from '../components-premade/SEO'
import { connect } from 'react-redux'
import { ReactReduxContext } from 'react-redux'
// import './../scss/style.scss';

type IState = {
  todos: any[]
}

class AllGroupsPage extends React.Component {
  state: IState

  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }
  }

  render() {
    return (
      <Layout bodyClass="all-groups">
        <SEO title="all-Groups" />

        <ReactReduxContext.Consumer>
          {({ store }) => {
            // do something useful with the store, like passing it to a child
            // component where it can be used in lifecycle methods

            console.log('this.store ', store)
            // console.log('this.store ', )

            store.subscribe(() => {
              console.log('ok')

              console.log(store.getState().todosReducer.todos)

              this.setState({
                ...this.state,
                todos: store.getState().todosReducer.todos,
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

                            {this.state.todos.map((todo) => {
                              return (
                                <tr>
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
                              <th scope="col">#</th>
                              <th scope="col">First</th>
                              <th scope="col">Last</th>
                              <th scope="col">Handle</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {JSON.stringify(this.state.todos)} */}

                            {this.state.todos.map((todo) => {
                              return (
                                <tr>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }}
        </ReactReduxContext.Consumer>
      </Layout>
    )
  }
}
const mapStateToProps = (state: any) => {
  // const mapStateToProps = (state: IState) => {
  return {
    todos: state.todosReducer.todos,
    // userId: state.loginReducer.userId,
  }
}

export default connect(mapStateToProps)(AllGroupsPage)
