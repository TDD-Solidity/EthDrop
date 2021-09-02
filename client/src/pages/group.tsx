import React from 'react';
import Layout from '../components-premade/Layout';
import SEO from '../components-premade/SEO';

class GroupPage extends React.Component {
  render() {
    return (
      <Layout bodyClass="group-event-page">
      <SEO title="Group Event" />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
        <h1>A Group</h1>
        <p>A Group's page!</p>
        </div>
        </div>

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

                            {[].map((todo) => {
                            {/* {this.state.todos.map((todo) => { */}
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

        </div>
        </div>
      </Layout>
    );
  }
}

export default GroupPage;