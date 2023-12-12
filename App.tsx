import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import Hello from "./src/components/Hello.tsx";

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
          <Hello></Hello>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
