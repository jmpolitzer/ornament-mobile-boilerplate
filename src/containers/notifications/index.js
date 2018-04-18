import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { presentLocalNotification, scheduleLocalNotification, setDatePickerValue } from '../../redux/notifications/actions';

class Notifications extends React.Component {
  constructor() {
    super();

    this.presentLocalNotification = this.presentLocalNotification.bind(this);
    this.scheduleLocalNotification = this.scheduleLocalNotification.bind(this);
    this.setNewDatePickerValue = this.setNewDatePickerValue.bind(this);
  }

  presentLocalNotification() {
    this.props.presentLocalNotification(this.props.signedInUser.notificationToken);
  }

  scheduleLocalNotification() {
    this.props.scheduleLocalNotification(this.props.signedInUser.notificationToken, this.props.datePickerValue);
    this.props.setDatePickerValue('');
  }

  setNewDatePickerValue(value) {
    this.props.setDatePickerValue(value);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          Notifications Tab
        </Text>
        <Button style={styles.button} backgroundColor='green' title='Present Local Notification' onPress={this.presentLocalNotification} />
        <DatePicker style={{width: 200, marginTop: 5}}
                    date={this.props.datePickerValue}
                    placeholder='Select Time'
                    mode='datetime'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    onDateChange={this.setNewDatePickerValue} />
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
    signedInUser: state.auth.signedInUser,
    datePickerValue: state.notifications.datePickerValue
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  presentLocalNotification,
  scheduleLocalNotification,
  setDatePickerValue
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
