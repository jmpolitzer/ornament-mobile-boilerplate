import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import R from 'ramda';

export default class ContactLists extends React.Component {

  render() {
    /* TODO: Render contact lists. */ 
    console.log(this.props.lists);
    return(
      <View style={styles.container}>
        <Text>Your Contact Lists</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
});
