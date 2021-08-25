import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SEO from './SEO';
import Header from './Header';
import Footer from './Footer';
import SubFooter from './SubFooter';
import '../scss/style.scss';
import { todosRequested } from '../state/actions/todos';

const Layout = props => {

  const dispatch = useDispatch();

  useEffect(() => {

    /*
     * This is an example of doing things when the app first loads.
     * You can dispatch a Redux action here to do some async thing
     * when the webapp boots up.
     */

    dispatch(todosRequested());

  }, []);
  
  
  return (<>
    <SEO />
    <div className={`page${props.bodyClass ? ` ${props.bodyClass}` : ''}`}>
      <div id="wrapper" className="wrapper">
        <Header />
        {props.children}
      </div>
      <Footer />
      <SubFooter />
    </div>
  </>);

};

export default Layout;
