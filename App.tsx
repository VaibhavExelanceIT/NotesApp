import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';

import RootStak from './src/navigation/RootStak';
import {mystore, persistor} from './src/store/mystore';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={mystore}>
        <PersistGate persistor={persistor}>
          <RootStak />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
