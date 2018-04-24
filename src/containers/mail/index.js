import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { createMailApiToken } from '../../redux/mail/actions';

class Mail extends React.Component {
  constructor() {
    super();

    this.createMailApiToken = this.createMailApiToken.bind(this);
  }

  componentWillMount() {
    this.createMailApiToken();
  }

  createMailApiToken() {
    this.props.createMailApiToken(this.props.signedInUser);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          Email Tab
        </Text>
        <Button style={styles.button} backgroundColor='green' title='Get Mail Token' onPress={() => console.log('do something')} />
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
    signedInUser: state.auth.signedInUser
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createMailApiToken
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mail);
