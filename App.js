import 'react-native-gesture-handler';
import React, { useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

import store, {persistor} from './app/redux/store';
import Navigation from '@navigation';
import SplashScreen from "react-native-splash-screen";

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation/>
      </PersistGate>
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
