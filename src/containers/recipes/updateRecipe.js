import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';

class UpdateRecipe extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.expandRecipeProps = this.expandRecipeProps.bind(this);
    this.navigateToEditRecipeProp = this.navigateToEditRecipeProp.bind(this);
  }

  expandRecipeProps() {
    const strippedRecipe = (R.omit(['doc', 'key'], this.props.recipe));

    return Object.keys(strippedRecipe).map((key, index) => {
      return { prop: strippedRecipe[key], propKey: key, key: index };
    });
  }

  navigateToEditRecipeProp(prop) {
    this.props.navigation.navigate('UpdateRecipeProp', { id: prop.key, prop: prop.propKey });
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <List>
            <FlatList data={this.expandRecipeProps()}
              renderItem={({item}) =>
                    <ListItem title={item.prop}
                              onPress={() => this.navigateToEditRecipeProp(item)} />} />
          </List>
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

export default connect(
  mapStateToProps
)(UpdateRecipe);
