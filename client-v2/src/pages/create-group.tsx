import React from 'react';
import Layout from '../components-premade/Layout';

class AllGroupsPage extends React.Component {
  render() {
    return (
      <Layout>

        <br />
        <br />

        <div className="container">
          <h1>Create Group Page</h1>
          <p>This page allows the contract owner(s) to add new groups.</p>
          <br />
          <br />
          <h2>Create Group</h2>
          {/* <table className="table">
            <thead>
              <tr>
                <th>

                </th>
                Foo
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  bar
                </td>
              </tr>
            </tbody>
          </table> */}

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

        </div>
      </Layout>
    );
  }
}

export default AllGroupsPage;