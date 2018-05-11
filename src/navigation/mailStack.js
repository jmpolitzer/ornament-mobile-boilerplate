import React from 'react';
import { Icon} from 'react-native-elements';
import { StackNavigator, HeaderBackButton } from 'react-navigation';
import Mail from '../containers/mail';
import ContactLists from '../containers/mail/contactLists';
import CreateContactList from '../containers/mail/createContactList';
import List from '../containers/mail/list';
import AddContacts from '../containers/mail/addContacts';
import { resetListScreen } from '../redux/mail/actions';

export const MailStack = StackNavigator({
  Mail: {
    screen: Mail,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Icon name='add-to-list'
                         type='entypo'
                         onPress={() => navigation.navigate('CreateContactList')}/>
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
    path: 'mail/contact-lists/:id',
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderBackButton onPress={() => {
        navigation.goBack();
        setTimeout(() => navigation.dispatch(resetListScreen()), 1000);
      }}/>
    })
  },
  /* TODO: Make this a modal. */ 
  AddContacts: {
    screen: AddContacts,
    path: 'mail/contact-lists/:id/add'
  }
});
