import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

class SplashScreen extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate() {
    if(this.props.navigateFromSplash === 'SignedIn') {
      this.props.navigation.navigate('SignedIn');
    } else {
      this.props.navigation.navigate('SignedOut');
    }
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
    navigateFromSplash: state.auth.navigateFromSplash
  }
}

export default connect(
  mapStateToProps
)(SplashScreen);
