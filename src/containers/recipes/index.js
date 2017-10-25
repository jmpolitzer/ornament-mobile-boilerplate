import React from 'react';
import { FlatList, StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRecipe, handleRecipesData} from '../../redux/recipes/actions';
import { firestore } from '../../firebase';

class Recipes extends React.Component {
  constructor() {
    super();
    this.ref = firestore.collection('recipes');
    this.unsubscribe = null;
    this.addRecipe = this.addRecipe.bind(this);
    this.handleRecipesData = this.handleRecipesData.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.handleRecipesData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addRecipe() {
    this.props.addRecipe();
  }

  handleRecipesData(snapshot) {
    this.props.handleRecipesData(snapshot);
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <Button title='Add Recipe' onPress={this.addRecipe} />
        </View>
        <View>
          <FlatList data={this.props.recipeList}
                    renderItem={({item}) => {
                      return <Text style={styles.item}>{item.name}, {item.country}</Text>;
                    }}
                    keyExtractor={(item, index) => index} />
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

const mapStateToProps = state => {
  return {
    recipeList: state.recipes.recipeList
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addRecipe,
  handleRecipesData
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
