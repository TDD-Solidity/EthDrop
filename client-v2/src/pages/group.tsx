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
        </div>
        </div>
      </Layout>
    );
  }
}

export default GroupPage;