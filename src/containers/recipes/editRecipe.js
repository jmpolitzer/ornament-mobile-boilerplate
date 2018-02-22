import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
// import {  } from '../../redux/recipes/actions';
// import { firestore } from '../../firebase';

class EditRecipe extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.expandRecipeProps = this.expandRecipeProps.bind(this);
  }

  expandRecipeProps() {
    const strippedRecipe = (R.omit(['doc', 'key'], this.props.recipe));

    return Object.keys(strippedRecipe).map((key, index) => {
      return { prop: strippedRecipe[key], key: index };
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <List>
            <FlatList data={this.expandRecipeProps()}
              renderItem={({item}) =>
                    <ListItem title={item.prop}
                              onPress={() => console.log('bout to edit ', item.prop)} />} />
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

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipe);
