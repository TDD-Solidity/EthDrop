import React from 'react'
import Layout from '../components-premade/Layout'
import SEO from '../components-premade/SEO'
import { connect } from 'react-redux'
import AllGroupsPageComponent from '../page-components/all-groups/all-groups'

class AllGroupsPage extends React.Component {
 
  render() {
    return (
      <Layout bodyClass="all-groups">
        <SEO title="all-Groups" />

        <AllGroupsPageComponent/>
      </Layout>
    )
  }
}
const mapStateToProps = (state: any) => {

  return {
    todos: state.todosReducer.todos,
  }
}

export default connect(mapStateToProps)(AllGroupsPage)
