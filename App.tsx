import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import IconRoundedRectangle from "./src/components/IconRoundedRectangle.tsx";

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
          <IconRoundedRectangle text={"Vin rouge"}></IconRoundedRectangle>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
