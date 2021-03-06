import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import UpdateRecipeForm from './forms/updateRecipeForm';
import { updateRecipe } from '../../redux/recipes/actions';

class UpdateRecipeProp extends React.Component {
  constructor() {
    super();

    this.updateRecipe = this.updateRecipe.bind(this);
  }

  updateRecipe(values) {
    this.props.updateRecipe(this.props.recipe.key, values);
    this.props.navigation.goBack();
  }

  render() {
    const key = this.props.navigation.state.params.prop;
    const propToEdit = R.pick([key], this.props.recipe);

    return(
      <View style={styles.container}>
        <UpdateRecipeForm fields={propToEdit}
                          initialValues={propToEdit}
                          onSubmit={this.updateRecipe} />
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
  updateRecipe
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRecipeProp);
