import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/appNavigator';
import { QueryProvider } from './providers/QueryProvider';

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AppNavigator />
      </QueryProvider>
    </SafeAreaProvider>
  );
};

export default App;
