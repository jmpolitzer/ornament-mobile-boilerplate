import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { setActiveListButton } from '../../redux/mail/actions';
import ListContacts from './listContacts';
import ListCampaigns from './listCampaigns';

class List extends React.Component {
  constructor() {
    super();

    this.updateIndex = this.updateIndex.bind(this);
    this.getActiveListSection = this.getActiveListSection.bind(this);
  }

  updateIndex(selectedIndex) {
    this.props.setActiveListButton(selectedIndex);
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
        <Text>{this.props.activeList.name}</Text>
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
    paddingTop: 22
  },
  buttonGroup: {
    height: 70
  }
});

const mapStateToProps = state => {
  return {
    signedInUser: state.auth.signedInUser,
    activeList: state.mail.activeList,
    activeListButton: state.mail.activeListButton
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveListButton
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
