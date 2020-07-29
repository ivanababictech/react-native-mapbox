import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { AppNavigator } from './config/AppNavigator';
import { addListener } from './store';


const AppNavigation = props => (
  <AppNavigator
    navigation={
      addNavigationHelpers({
        dispatch: props.dispatch,
        state: props.nav,
        addListener,
      })
    }
  />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppNavigation);
