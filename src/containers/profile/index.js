import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { signOut } from '../../redux/auth/actions';
import { increment, decrement } from '../../redux/counter/actions';

class Profile extends React.Component {
  constructor() {
    super();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.signout = this.signout.bind(this);
  }

  increment() {
    this.props.increment();
  }

  decrement() {
    this.props.decrement();
  }

  signout() {
    this.props.navigation.navigate('Splash');
    this.props.signOut();
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <Text>
            {this.props.count}
          </Text>
        </View>
        <View>
          <Button style={styles.button} title='increment' onPress={this.increment} />
          <Button style={styles.button} title='decrement' onPress={this.decrement} />
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
    paddingTop: 22
  },
  button: {
    marginTop: 5
  }
});

const mapStateToProps = state => {
  return {
    count: state.counter.count
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  decrement,
  signOut
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
