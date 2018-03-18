import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../../navigation';

const initialState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('Splash'));

export default (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
