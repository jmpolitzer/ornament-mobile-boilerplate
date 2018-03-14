import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

class SplashScreen extends React.Component {
  constructor() {
    super();

    this.navigateTo = this.navigateTo.bind(this);
  }

  componentDidUpdate() {
    if(this.props.signedInUser) {
      this.navigateTo('SignedIn');
    } else {
      this.navigateTo('SignedOut');
    }
  }

  navigateTo(routeName) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <ActivityIndicator/>
        </View>
        <View>
          <Text>Please wait while the app loads.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    signedInUser: state.auth.signedInUser,
    fireauthIsInit: state.auth.fireauthIsInit
  }
}

export default connect(
  mapStateToProps
)(SplashScreen);
