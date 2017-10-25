import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider, connect } from 'react-redux';
import store from './src/store';
import Main from './src/containers/main';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
