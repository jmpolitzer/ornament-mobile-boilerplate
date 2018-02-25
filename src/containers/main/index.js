import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { RootNavigator } from '../../navigation';

const addListener = createReduxBoundAddListener('root');

class Main extends React.Component {
  render() {
    return (
      <RootNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
        addListener
      })} />
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation
  }
}

export default connect(
  mapStateToProps
)(Main);
