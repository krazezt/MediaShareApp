import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {firebaseConfig} from './src/firebase';
import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';

import {initializeApp} from 'firebase/app';
import {LogBox} from 'react-native';
import { NativeBaseProvider } from 'native-base';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ignore the timer warning
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <NativeBaseProvider>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </NativeBaseProvider>
  );
}
