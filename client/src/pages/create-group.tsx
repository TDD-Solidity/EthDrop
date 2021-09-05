import React from 'react';
import Layout from '../components-premade/Layout';
import SEO from '../components-premade/SEO';
import CreateGroupPageComponent from '../page-components/create-group/create-group';

class AllGroupsPage extends React.Component {
  render() {
    return (
      <Layout>

      <SEO title="Create-Group" />

        <CreateGroupPageComponent/>
      </Layout>
    );
  }
}

export default AllGroupsPage;