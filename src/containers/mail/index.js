import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { getSIBAccount } from '../../redux/mail/actions';

class Mail extends React.Component {
  constructor() {
    super();

    this.getSIBAccount = this.getSIBAccount.bind(this);
  }

  getSIBAccount() {
    this.props.getSIBAccount();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          Email Tab
        </Text>
        <Button style={styles.button} backgroundColor='green' title='Get SIB Account' onPress={this.getSIBAccount} />
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
  getSIBAccount
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mail);
