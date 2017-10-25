import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

class Home extends React.Component {
  render() {
    return(
      <View>
        <Text>You are home.</Text>
        <Button title='counter' onPress={() => this.props.navigation.navigate('Counter')} />
        <Button title='recipes' onPress={() => this.props.navigation.navigate('Recipes')} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
