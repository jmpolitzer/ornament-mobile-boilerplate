import React from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swipeout from 'react-native-swipeout';

export default class ContactLists extends React.Component {
  constructor() {
    super();

    this.onSwipeOpen = this.onSwipeOpen.bind(this);
    this.onSwipeClose = this.onSwipeClose.bind(this);
  }

  onSwipeOpen(rowId, direction) {
    this.props.setActiveListRow(rowId);
  }

  onSwipeClose(rowId, direction) {
    if(rowId === this.props.activeListRow && typeof direction !== 'undefined') {
      this.props.setActiveListRow(null);
    }
  }

  navigateToListScreen(e, list) {
    this.props.setActiveList(list);
    this.props.navigateToListScreen(list.id);
  }

  render() {
    const swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: () => this.props.deleteContactList()
      }
    ];

    return(
      <View>
        {this.props.makingMailServerRequest ? <ActivityIndicator/> :
         !this.props.lists.length ? <Text>You do not have any lists.</Text> :
        <List>
          <FlatList data={this.props.lists}
                    extraData={this.props.activeListRow}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item}) =>
                      <Swipeout left={swipeoutBtns}
                        rowId={item.id}
                        autoClose={true}
                        close={item.id !== this.props.activeListeRow}
                        onOpen={(sectionId, rowId, direction) => {
                          this.onSwipeOpen(item.id, direction);
                        }}
                        onClose={(sectionId, rowId, direction) => {
                          this.onSwipeClose(item.id, direction);
                        }}>
                          <ListItem title={item.name}
                                    subtitle={`${item.totalSubscribers} Contacts`}
                                    onPress={(e) => this.navigateToListScreen(e, item)} />
                      </Swipeout>} />
        </List>}
      </View>
    );
  }
}
