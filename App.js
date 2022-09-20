import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

import store, {persistor} from './app/redux/store';
import Navigation from '@navigation';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
