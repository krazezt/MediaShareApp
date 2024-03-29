import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { firebaseConfig } from './src/firebase';
import { DataProvider } from './src/hooks';
import AppNavigation from './src/navigation/App';

import { initializeApp } from 'firebase/app';
import { LogBox } from 'react-native';
import { NativeBaseProvider } from 'native-base';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ignore the some unfixed warnings
LogBox.ignoreLogs([
  'Setting a timer',
  'Require cycle:',
  "Warning: Can't perform a React state update on an unmounted component.",
  '[Unhandled promise rejection:',
]);

export default function App() {
  return (
    <NativeBaseProvider>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </NativeBaseProvider>
  );
}
