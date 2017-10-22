import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Link } from 'react-router-native';
import { increment, decrement } from '../../redux/counter/actions';

class Counter extends React.Component {
  constructor() {
    super();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.props.increment();
  }

  decrement() {
    this.props.decrement();
  }

  render() {
    return(
      <View>
        <View>
          <Text>
            {this.props.count}
          </Text>
        </View>
        <View>
          <Button title='increment' onPress={this.increment} />
          <Button title='decrement' onPress={this.decrement} />
        </View>
        <View>
          <Link to={'/'}>
            <Text>geaux home</Text>
          </Link>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.counter.count
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  decrement
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
