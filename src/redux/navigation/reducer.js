import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../../navigation';

const initialState = RootNavigator.router.getStateForAction(NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Splash'
    })
  ]
}));

export default (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
