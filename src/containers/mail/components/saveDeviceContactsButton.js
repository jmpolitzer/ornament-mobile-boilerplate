import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { saveDeviceContacts } from '../../../redux/mail/actions';

class SaveDeviceContactsButton extends React.Component {
  constructor() {
    super();

    this.saveDeviceContacts = this.saveDeviceContacts.bind(this);
  }

  saveDeviceContacts() {
    this.props.saveDeviceContacts(this.props.allContacts, this.props.contactsToSave);

    this.props.navigation.goBack();
  }

  render() {
    return(
      <Button title='Done' onPress={this.saveDeviceContacts}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    contactsToSave: state.mail.selectedDeviceContacts,
    allContacts: state.mail.deviceContacts
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  saveDeviceContacts,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveDeviceContactsButton);
