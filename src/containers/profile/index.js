import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { ImagePicker } from 'expo';
import { signOut, setAuthType } from '../../redux/auth/actions';
import { selectProfilePhoto } from '../../redux/profile/actions';

class Profile extends React.Component {
  constructor() {
    super();

    this.selectProfilePhoto = this.selectProfilePhoto.bind(this);
    this.signout = this.signout.bind(this);
  }

  selectProfilePhoto() {
    this.props.selectProfilePhoto(this.props.signedInUser);
  }

  signout() {
    this.props.signOut();
    this.props.setAuthType('signIn');
  }

  render() {
    return(
      <View style={styles.container}>
        {this.props.signedInUser && <View>
          {this.props.signedInUser.profileImageURL &&
            <Avatar large rounded source={{uri: this.props.signedInUser.profileImageURL}} />}
          <Text>
            {this.props.signedInUser.name}
          </Text>
        </View>}
        <View>
          <Button style={styles.button} backgroundColor='blue' title='Select Profile Photo' onPress={this.selectProfilePhoto} />
        </View>
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
  setAuthType,
  selectProfilePhoto
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
