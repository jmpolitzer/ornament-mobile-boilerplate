import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';

class ListContacts extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>These are the contacts in this list.</Text>
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

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContacts);
