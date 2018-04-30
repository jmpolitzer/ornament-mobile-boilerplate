import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import R from 'ramda';

export default class ContactLists extends React.Component {

  render() {
    return(
      <View>
        {!this.props.lists ? <ActivityIndicator/> :
        <List>
          <FlatList data={this.props.lists}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => <ListItem title={item.name} />} />
        </List>}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
