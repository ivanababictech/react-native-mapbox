import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import AppNavigation from './src/AppNavigation';

const App = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
