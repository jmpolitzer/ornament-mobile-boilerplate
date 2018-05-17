import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateContactListForm from './forms/createContactListForm';
import { createContactList } from '../../redux/mail/actions';

class CreateContactList extends React.Component {
  constructor() {
    super();

    this.createList = this.createList.bind(this);
  }

  createList(values) {
    this.props.createContactList(this.props.signedInUser.mailId, values);
  }

  render() {
    return(
      <View style={styles.container}>
        <CreateContactListForm onSubmit={this.createList} />
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
    signedInUser: state.auth.signedInUser
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createContactList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContactList);
