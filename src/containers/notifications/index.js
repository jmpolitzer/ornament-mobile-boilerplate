import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
  
class Notifications extends React.Component {
  constructor() {
    super();

  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          Notifications Tab
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    signedInUser: state.auth.signedInUser
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
