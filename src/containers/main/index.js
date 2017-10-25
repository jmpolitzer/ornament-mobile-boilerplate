import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { RootNavigator } from '../../navigation';

class Main extends React.Component {
  render() {
    return (
      <RootNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation
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
