import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class AddContacts extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <View style={styles.container}>
        <List>
          <FlatList data={this.props.deviceContacts.data}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) =>
                      <ListItem title={item.name}
                                subtitle={item.emails[0].email} />} />
        </List>
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
    deviceContacts: state.mail.deviceContacts
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContacts);
