import React from 'react';
import { ActivityIndicator, Keyboard, FlatList, StyleSheet, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateRecipeForm from './createRecipeForm';
import { addRecipe, handleRecipesData, showRecipesLoading, setActiveRecipeRow } from '../../redux/recipes/actions';
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

  deleteRecipe() {
    console.log('deleting recipe at row ', this.props.activeRecipeRow);
  }

  handleRecipesData(snapshot) {
    this.props.handleRecipesData(snapshot);
  }

  navigateToRecipe(key) {
    this.props.navigation.navigate('Recipe', { id: key });
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
              renderItem={({item, index}) =>
                <Swipeout right={swipeoutBtns}
                  rowId={index}
                  autoClose={true}
                  close={index !== this.props.activeRecipeRow}
                  onOpen={(sectionId, rowId, direction) => {
                    this.onSwipeOpen(index, direction);
                  }}
                  onClose={(sectionId, rowId, direction) => {
                    this.onSwipeClose(index, direction);
                  }}>
                    <ListItem key={item.key}
                              title={`${item.name}`}
                              onPress={() => this.navigateToRecipe(item.key)} />
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
    createRecipeForm: state.form.createRecipeForm,
    activeRecipeRow: state.recipes.activeRecipeRow
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showRecipesLoading,
  addRecipe,
  handleRecipesData,
  setActiveRecipeRow
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
