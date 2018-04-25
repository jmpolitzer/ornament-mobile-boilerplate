import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { getMailAccount, createMailFolderForUser, getMailFolder } from '../../redux/mail/actions';

class Mail extends React.Component {
  constructor() {
    super();

    this.getMailAccount = this.getMailAccount.bind(this);
    this.createMailFolderForUser = this.createMailFolderForUser.bind(this);
  }

  componentWillMount() {
    this.props.getMailFolder();
  }

  getMailAccount() {
    this.props.getMailAccount();
  }

  createMailFolderForUser() {
    this.props.createMailFolderForUser();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          Email Tab
        </Text>
        <Button style={styles.button} backgroundColor='green' title='Test Mail Account' onPress={this.getMailAccount} />
        <Button style={styles.button} backgroundColor='blue' title='Get Started with Mail' onPress={this.createMailFolderForUser} />
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
  button: {
    marginTop: 5
  }
});

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMailAccount,
  createMailFolderForUser,
  getMailFolder
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mail);
