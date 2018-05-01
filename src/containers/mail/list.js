import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
// import { Button } from 'react-native-elements';
import {  } from '../../redux/mail/actions';

class List extends React.Component {
  constructor() {
    super();
  }

  render() {    
    return(
      <View style={styles.container}>
        <Text>{this.props.activeList.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  button: {
    marginTop: 5
  }
});

const mapStateToProps = state => {
  return {
    signedInUser: state.auth.signedInUser,
    activeList: state.mail.activeList
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
