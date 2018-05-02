import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configuration from './src/store';
import Main from './src/containers/main';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={configuration().store}>
        <PersistGate persistor={configuration().persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
