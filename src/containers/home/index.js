import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Link } from 'react-router-native';

class Home extends React.Component {
  render() {
    return(
      <View>
        <Text>You are home.</Text>
        <Link to={'/counter'}>
          <Text>counter</Text>
        </Link>
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
