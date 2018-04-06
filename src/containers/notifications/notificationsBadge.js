import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements';

class NotificationsBadge extends React.Component {

  render() {
    return(
      <Badge value={this.props.unreadMessagesCount} />
    );
  }
}

const mapStateToProps = state => {
  return {
    unreadMessagesCount: state.notifications.unreadMessagesCount
  };
}

export default connect(
  mapStateToProps,
  null
)(NotificationsBadge);
