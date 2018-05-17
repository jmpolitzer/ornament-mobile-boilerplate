import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import R from 'ramda';
import { selectDeviceContact } from '../../redux/mail/actions';

class AddContacts extends React.Component {
  constructor() {
    super();

    this.selectContact = this.selectContact.bind(this);
    this.getSelectedStatusIcon = this.getSelectedStatusIcon.bind(this);
  }

  selectContact(id) {
    this.props.selectDeviceContact(id);
  }

  getSelectedStatusIcon(id) {
    const selectedStatus = this.props.selectedDeviceContacts[id]

    return <Icon style={styles.radio}
                 color={selectedStatus ? 'green' : 'gray'}
                 name={selectedStatus ? 'dot-circle-o' : 'circle-o'}
                 type='font-awesome' />;
  }

  render() {
    return(
      <View style={styles.container}>
        <List>
          <FlatList data={this.props.deviceContacts.data}
                    keyExtractor={(item, index) => item.id.toString()}
                    extraData={this.props.selectedDeviceContacts}
                    renderItem={({item}) =>
                      <ListItem title={item.name}
                                hideChevron
                                leftIcon={this.getSelectedStatusIcon(item.id)}
                                onPress={() => this.selectContact(item.id)} />} />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  radio: {
    marginRight: 5
  }
});

const mapStateToProps = state => {
  return {
    deviceContacts: state.mail.deviceContacts,
    selectedDeviceContacts: state.mail.selectedDeviceContacts
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  selectDeviceContact,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContacts);
