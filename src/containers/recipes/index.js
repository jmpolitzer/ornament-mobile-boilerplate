import React from 'react';
import { ActivityIndicator, Keyboard, FlatList, StyleSheet, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateRecipeForm from './createRecipeForm';
import { addRecipe, handleRecipesData, showRecipesLoading } from '../../redux/recipes/actions';
import { firestore } from '../../firebase';

class Recipes extends React.Component {
  constructor() {
    super();
    this.ref = firestore.collection('recipes');
    this.unsubscribe = null;
    this.addRecipe = this.addRecipe.bind(this);
    this.handleRecipesData = this.handleRecipesData.bind(this);
  }

  componentWillMount() {
    this.props.showRecipesLoading(true);
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.handleRecipesData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addRecipe() {
    this.props.showRecipesLoading(true);
    this.props.addRecipe(this.props.createRecipeForm.values);
    Keyboard.dismiss();
  }

  handleRecipesData(snapshot) {
    this.props.handleRecipesData(snapshot);
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <CreateRecipeForm onSubmit={this.addRecipe} />
        </View>
        <View>
          {this.props.isFetchingRecipes ? <ActivityIndicator/> :
          (!this.props.recipeList.length ? <Text>You do not currently have any recipes.</Text> :
          <List>
            <FlatList data={this.props.recipeList}
                      renderItem={({item}) => <ListItem key={item.key} title={`${item.name}, ${item.duration}`}/>} />
          </List>)}
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
    isFetchingRecipes: state.recipes.isFetchingRecipes,
    recipeList: state.recipes.recipeList,
    createRecipeForm: state.form.createRecipeForm
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showRecipesLoading,
  addRecipe,
  handleRecipesData
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
