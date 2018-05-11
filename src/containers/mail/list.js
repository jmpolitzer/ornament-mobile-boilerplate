import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { ButtonGroup, Button, Icon } from 'react-native-elements';
import { updateContactList, setActiveListButton, toggleEditListMode,
         launchDeviceContacts } from '../../redux/mail/actions';
import UpdateContactListForm from './forms/updateContactListForm';
import ListContacts from './listContacts';
import ListCampaigns from './listCampaigns';

class List extends React.Component {
  constructor() {
    super();

    this.updateList = this.updateList.bind(this);
    this.toggleEditListMode = this.toggleEditListMode.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.getDisplayOrEditList = this.getDisplayOrEditList.bind(this);
    this.getActiveListSection = this.getActiveListSection.bind(this);
    this.launchDeviceContacts = this.launchDeviceContacts.bind(this);
  }

  updateList(form) {
    this.props.updateContactList(this.props.signedInUser.mailId, this.props.activeList.id, form);
  }

  toggleEditListMode(e, bool) {
    this.props.toggleEditListMode(bool);
  }

  updateIndex(selectedIndex) {
    this.props.setActiveListButton(selectedIndex);
  }

  launchDeviceContacts() {
    this.props.launchDeviceContacts();
  }

  getDisplayOrEditList() {
    const initialValues = { name: this.props.activeList.name };

    return this.props.showEditListMode ?
      <View style={styles.listTitleRow}>
        <View style={styles.editForm}>
          <UpdateContactListForm initialValues={initialValues} onSubmit={this.updateList} />
          <Button style={styles.cancelButton} title='Cancel' onPress={(e) => this.toggleEditListMode(e, false)}/>
        </View>
      </View>
      :
      <View style={styles.listTitleRow}>
        <Text style={styles.listTitle}>{this.props.activeList.name}</Text>
        <Icon style={styles.editIcon} name='edit' type='material-icons' onPress={(e) => this.toggleEditListMode(e, true)}/>
      </View>
  }

  getActiveListSection() {
    const sections = {
      0: <ListContacts launchDeviceContacts={this.launchDeviceContacts} />,
      1: <ListCampaigns />
    };

    return sections[this.props.activeListButton];
  }

  render() {
    const buttons = ['Contacts', 'Campaigns'];

    return(
      <View style={styles.container}>
        {this.getDisplayOrEditList()}
        <ButtonGroup onPress={this.updateIndex} selectedIndex={this.props.activeListButton}
                     buttons={buttons} containerStyle={styles.buttonGroup} />
        {this.getActiveListSection()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'center'
  },
  listTitleRow: {
    flexDirection: 'row'
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  editIcon: {
    transform: [{ rotate: '270deg'}],
    marginLeft: 5
  },
  editForm: {
    flexDirection: 'column'
  },
  cancelButton: {
    marginTop: 5
  },
  buttonGroup: {
    height: 70
  }
});

const mapStateToProps = state => {
  return {
    signedInUser: state.auth.signedInUser,
    activeList: state.mail.activeList,
    activeListButton: state.mail.activeListButton,
    showEditListMode: state.mail.showEditListMode
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveListButton,
  toggleEditListMode,
  updateContactList,
  launchDeviceContacts
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
