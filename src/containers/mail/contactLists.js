import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class ContactLists extends React.Component {
  
  navigateToListScreen(e, list) {
    this.props.setActiveList(list);
    this.props.navigateToListScreen(list.id);
  }

  render() {
    return(
      <View>
        {!this.props.lists ? <ActivityIndicator/> :
        <List>
          <FlatList data={this.props.lists}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) => <ListItem title={item.name}
                                                      subtitle={`${item.totalSubscribers} Contacts`}
                                                      onPress={(e) => this.navigateToListScreen(e, item)} />} />
        </List>}
      </View>
    );
  }
}
