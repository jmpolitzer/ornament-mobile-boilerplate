import React from 'react';
import { Icon} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Mail from '../containers/mail';
import ContactLists from '../containers/mail/contactLists';
import CreateContactList from '../containers/mail/createContactList';
import List from '../containers/mail/list';

export const MailStack = StackNavigator({
  Mail: {
    screen: Mail,
    navigationOptions: ({ navigation }) => ({
      title: 'Contact Lists',
      headerRight: <Icon name='plus'
                         type='material-community'
                         onPress={() => {
                           navigation.navigate('CreateContactList')
                         }}/>
    })
  },
  ContactLists: {
    screen: ContactLists,
    path: 'mail/contact-lists'
  },
  CreateContactList: {
    screen: CreateContactList,
    path: 'mail/contact-lists/create'
  },
  List: {
    screen: List,
    path: 'mail/contact-lists/:id'
  }
});
