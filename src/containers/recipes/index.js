import React from 'react';
import { ActivityIndicator, Keyboard, FlatList, StyleSheet, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateRecipeForm from './forms/createRecipeForm';
import { addRecipe, deleteRecipe, handleRecipesData,
         showRecipesLoading, setActiveRecipe, setActiveRecipeRow } from '../../redux/recipes/actions';
import { firestore } from '../../firebase';

class Recipes extends React.Component {
  constructor() {
    super();
    
    this.ref = firestore.collection('recipes');
    this.unsubscribe = null;
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.handleRecipesData = this.handleRecipesData.bind(this);
    this.navigateToRecipe = this.navigateToRecipe.bind(this);
    this.onSwipeOpen = this.onSwipeOpen.bind(this);
    this.onSwipeClose = this.onSwipeClose.bind(this);
  }

  componentWillMount() {
    this.props.showRecipesLoading(true);
  }

  componentDidMount() {
    this.unsubscribe = this.ref.where('userId', '==', this.props.signedInUser.id)
    .onSnapshot(this.handleRecipesData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addRecipe(values) {
    values.userId = this.props.signedInUser.id;

    this.props.showRecipesLoading(true);
    this.props.addRecipe(values);
    Keyboard.dismiss();
  }

  deleteRecipe() {
    this.props.deleteRecipe(this.props.activeRecipeRow);
  }

  handleRecipesData(snapshot) {
    this.props.handleRecipesData(snapshot);
  }

  navigateToRecipe(recipe) {
    this.props.navigation.navigate('Recipe', { id: recipe.key });
    this.props.setActiveRecipe(recipe);
    this.props.setActiveRecipeRow(null);
  }

  onSwipeOpen(rowId, direction) {
    this.props.setActiveRecipeRow(rowId);
  }

  onSwipeClose(rowId, direction) {
    if(rowId === this.props.activeRecipeRow && typeof direction !== 'undefined') {
      this.props.setActiveRecipeRow(null);
    }
  }

  render() {
    const swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: () => this.deleteRecipe()
      }
    ];

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
              extraData={this.props.activeRecipeRow}
              renderItem={({item}) =>
                <Swipeout right={swipeoutBtns}
                  rowId={item.key}
                  autoClose={true}
                  close={item.key !== this.props.activeRecipeRow}
                  onOpen={(sectionId, rowId, direction) => {
                    this.onSwipeOpen(item.key, direction);
                  }}
                  onClose={(sectionId, rowId, direction) => {
                    this.onSwipeClose(item.key, direction);
                  }}>
                    <ListItem title={`${item.name}`}
                              onPress={() => this.navigateToRecipe(item)} />
                </Swipeout>} />
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
    activeRecipeRow: state.recipes.activeRecipeRow,
    signedInUser: state.auth.signedInUser
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showRecipesLoading,
  addRecipe,
  deleteRecipe,
  handleRecipesData,
  setActiveRecipe,
  setActiveRecipeRow
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
