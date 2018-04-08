import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { presentLocalNotification, scheduleLocalNotification } from '../../redux/notifications/actions';

class Notifications extends React.Component {
  constructor() {
    super();

    this.presentLocalNotification = this.presentLocalNotification.bind(this);
    this.scheduleLocalNotification = this.scheduleLocalNotification.bind(this);
  }

  presentLocalNotification() {
    this.props.presentLocalNotification(this.props.signedInUser.notificationToken);
  }

  scheduleLocalNotification() {
    this.props.scheduleLocalNotification(this.props.signedInUser.notificationToken);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          Notifications Tab
        </Text>
        <Button style={styles.button} backgroundColor='green' title='Present Local Notification' onPress={this.presentLocalNotification} />
        <Button style={styles.button} backgroundColor='red'title='Schedule Local Notification' onPress={this.scheduleLocalNotification} />
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
  button: {
    marginTop: 5
  }
});

const mapStateToProps = state => {
  return {
    signedInUser: state.auth.signedInUser
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  presentLocalNotification,
  scheduleLocalNotification
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
