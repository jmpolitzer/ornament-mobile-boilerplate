import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showRecipesLoading, fetchRecipe } from '../../redux/recipes/actions';
// import { firestore } from '../../firebase';

class Recipe extends React.Component {
  constructor() {
    super();
    // this.ref = firestore.collection('recipes');
    // this.unsubscribe = null;
    // this.handleRecipesData = this.handleRecipesData.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.navigation);
    // this.props.showRecipesLoading(true);
    const recipeId = this.props.navigation.state.params.id;
    this.props.fetchRecipe(recipeId);
  }

  componentDidMount() {
    // this.unsubscribe = this.ref.onSnapshot(this.handleRecipesData);
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  // handleRecipesData(snapshot) {
  //   this.props.handleRecipesData(snapshot);
  // }

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
  fetchRecipe
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
