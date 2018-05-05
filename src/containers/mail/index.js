import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { getMailAccount, createMailFolderForUser, getMailFolderLists,
         deleteContactList, setActiveList, setActiveListRow,
         onMakingMailServerRequest } from '../../redux/mail/actions';
import ContactLists from './contactLists';

class Mail extends React.Component {
  constructor() {
    super();

    this.getMailAccount = this.getMailAccount.bind(this);
    this.createMailFolderForUser = this.createMailFolderForUser.bind(this);
    this.deleteContactList = this.deleteContactList.bind(this);
    this.navigateToListScreen = this.navigateToListScreen.bind(this);
    this.setActiveList = this.setActiveList.bind(this);
    this.setActiveListRow = this.setActiveListRow.bind(this);
  }

  componentDidMount() {
    if(this.props.signedInUser && this.props.signedInUser.mailId) {
      this.props.getMailFolderLists(this.props.signedInUser.mailId);
      !this.props.mailFolderLists.length && this.props.onMakingMailServerRequest(true);
    }
  }

  getMailAccount() {
    this.props.getMailAccount();
  }

  createMailFolderForUser() {
    this.props.createMailFolderForUser(this.props.signedInUser);
  }

  deleteContactList() {
    this.props.deleteContactList(this.props.signedInUser.mailId, this.props.activeListRow);
  }

  navigateToListScreen(id) {
    this.props.navigation.navigate('List', { id: id });
  }

  setActiveList(list) {
    this.props.setActiveList(list);
  }

  setActiveListRow(id) {
    this.props.setActiveListRow(id)
  }

  render() {
    return(
      <View style={styles.container}>
        <Button style={styles.button} backgroundColor='green' title='Test Mail Account' onPress={this.getMailAccount} />
        {this.props.signedInUser.mailId ? <ContactLists lists={this.props.mailFolderLists}
                                                        navigateToListScreen={this.navigateToListScreen}
                                                        setActiveList={this.setActiveList}
                                                        setActiveListRow={this.setActiveListRow}
                                                        activeListRow={this.props.activeListRow}
                                                        deleteContactList={this.deleteContactList}
                                                        makingMailServerRequest={this.props.makingMailServerRequest} /> :
        <Button style={styles.button} backgroundColor='blue' title='Get Started with Mail' onPress={this.createMailFolderForUser} />}
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
    mailFolderLists: state.mail.mailFolderLists,
    activeListRow: state.mail.activeListRow,
    makingMailServerRequest: state.mail.makingMailServerRequest
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMailAccount,
  createMailFolderForUser,
  getMailFolderLists,
  deleteContactList,
  setActiveList,
  setActiveListRow,
  onMakingMailServerRequest
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mail);
