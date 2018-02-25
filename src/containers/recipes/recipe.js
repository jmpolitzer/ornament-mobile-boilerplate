import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showRecipesLoading, clearActiveRecipe } from '../../redux/recipes/actions';

class Recipe extends React.Component {
  constructor() {
    super();
  }

  componentWillUnmount() {
    this.props.clearActiveRecipe();
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <Text>Name: {this.props.recipe.name}</Text>
          <Text>Duration: {this.props.recipe.duration}</Text>
        </View>
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
  clearActiveRecipe
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
