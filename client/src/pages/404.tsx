import React from 'react';
import Layout from '../components-premade/Layout';
import NotFoundPageComponent from '../page-components/404/404';

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout>
        <NotFoundPageComponent />
        <h1>Not Found</h1>
      </Layout>
    );
  }
}

export default NotFoundPage;
