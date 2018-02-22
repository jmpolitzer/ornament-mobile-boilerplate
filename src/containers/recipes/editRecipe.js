import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {  } from '../../redux/recipes/actions';
// import { firestore } from '../../firebase';

class EditRecipe extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {

  }

  render() {
    return(
      <View style={styles.container}>
        {!this.props.recipe ? <ActivityIndicator /> :
        <View>
          <Text>Name: {this.props.recipe.name}</Text>
          <Text>Duration: {this.props.recipe.duration}</Text>
        </View>}
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
    recipe: state.recipes.recipe
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipe);
