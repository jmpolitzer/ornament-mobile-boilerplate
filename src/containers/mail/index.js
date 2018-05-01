import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { getMailAccount, createMailFolderForUser, getMailFolderLists, setActiveList } from '../../redux/mail/actions';
import ContactLists from './contactLists';

class Mail extends React.Component {
  constructor() {
    super();

    this.getMailAccount = this.getMailAccount.bind(this);
    this.createMailFolderForUser = this.createMailFolderForUser.bind(this);
    this.navigateToListScreen = this.navigateToListScreen.bind(this);
    this.setActiveList = this.setActiveList.bind(this);
  }

  componentDidMount() {
    if(this.props.signedInUser && this.props.signedInUser.mailId) {
      this.props.getMailFolderLists(this.props.signedInUser.mailId);
    }
  }

  getMailAccount() {
    this.props.getMailAccount();
  }

  createMailFolderForUser() {
    this.props.createMailFolderForUser(this.props.signedInUser);
  }

  navigateToListScreen(id) {
    this.props.navigation.navigate('List', { id: id });
  }

  setActiveList(list) {
    this.props.setActiveList(list);
  }

  render() {
    return(
      <View style={styles.container}>
        <Button style={styles.button} backgroundColor='green' title='Test Mail Account' onPress={this.getMailAccount} />
        {this.props.signedInUser.mailId ? <ContactLists lists={this.props.mailFolderLists}
                                                        navigateToListScreen={this.navigateToListScreen}
                                                        setActiveList={this.setActiveList}/> :
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
    mailFolderLists: state.mail.mailFolderLists
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMailAccount,
  createMailFolderForUser,
  getMailFolderLists,
  setActiveList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mail);
