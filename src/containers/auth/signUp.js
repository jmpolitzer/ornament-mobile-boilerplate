import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form';
import { signUp } from '../../redux/auth/actions';
import SignUpForm from './signUpForm';
import { validateAuthForm } from '../../helpers/forms';
import R from 'ramda';

class SignUp extends React.Component {
  constructor() {
    super();

    this.signUp = this.signUp.bind(this);
  }

  signUp(values, dispatch, props) {
    const fields = Object.keys(props.registeredFields);
    const errors = validateAuthForm(fields, values);

    if(!R.isEmpty(errors)) {
      throw new SubmissionError(errors);
    } else {
      return this.props.signUp(values)
      .catch((error) => {
        throw new SubmissionError(error.errors);
      });
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <SignUpForm onSubmit={this.signUp} />
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

const mapDispatchToProps = dispatch => bindActionCreators({
  signUp
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
