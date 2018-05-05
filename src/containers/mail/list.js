import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';
import { setActiveListButton, toggleEditListMode } from '../../redux/mail/actions';
import ListContacts from './listContacts';
import ListCampaigns from './listCampaigns';

class List extends React.Component {
  constructor() {
    super();

    this.toggleEditListMode = this.toggleEditListMode.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.getDisplayOrEditList = this.getDisplayOrEditList.bind(this);
    this.getActiveListSection = this.getActiveListSection.bind(this);
  }

  toggleEditListMode(e, bool) {
    this.props.toggleEditListMode(bool);
  }

  updateIndex(selectedIndex) {
    this.props.setActiveListButton(selectedIndex);
  }

  getDisplayOrEditList() {
    return this.props.showEditListMode ?
      <Text onPress={(e) => this.toggleEditListMode(e, false)}>Edit List Name</Text> :
      <View style={styles.listTitleRow}>
        <Text style={styles.listTitle}>{this.props.activeList.name}</Text>
        <Icon style={styles.editIcon} name='edit' type='material-icons' onPress={(e) => this.toggleEditListMode(e, true)}/>
      </View>
  }

  getActiveListSection() {
    const sections = {
      0: <ListContacts />,
      1: <ListCampaigns />
    };

    return sections[this.props.activeListButton];
  }

  render() {
    const buttons = ['Contacts', 'Campaigns'];

    return(
      <View style={styles.container}>
        {this.getDisplayOrEditList()}
        <ButtonGroup onPress={this.updateIndex} selectedIndex={this.props.activeListButton}
                     buttons={buttons} containerStyle={styles.buttonGroup} />
        {this.getActiveListSection()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'center'
  },
  listTitleRow: {
    flexDirection: 'row'
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  editIcon: {
    transform: [{ rotate: '270deg'}],
    marginLeft: 5
  },
  buttonGroup: {
    height: 70
  }
});

const mapStateToProps = state => {
  return {
    signedInUser: state.auth.signedInUser,
    activeList: state.mail.activeList,
    activeListButton: state.mail.activeListButton,
    showEditListMode: state.mail.showEditListMode
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveListButton,
  toggleEditListMode
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
