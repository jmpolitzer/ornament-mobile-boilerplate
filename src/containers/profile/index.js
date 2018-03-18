import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { signOut, setAuthType } from '../../redux/auth/actions';

class Profile extends React.Component {
  constructor() {
    super();

    this.signout = this.signout.bind(this);
  }

  signout() {
    this.props.signOut();
    this.props.setAuthType('signIn');
  }

  render() {
    return(
      <View style={styles.container}>
        {this.props.signedInUser && <View>
          <Text>
            {this.props.signedInUser.displayName}
          </Text>
        </View>}
        <View>
          <Button style={styles.button} backgroundColor='#841584' title='Sign Out' onPress={this.signout} />
        </View>
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
  signOut,
  setAuthType
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
