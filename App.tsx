import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar, StyleSheet,
} from 'react-native';

import IconRoundedRectangle from "./src/components/IconRoundedRectangle.tsx";
import WineRowSummary from "./src/components/WineRowSummary.tsx";

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
          style={styles.container}
        contentInsetAdjustmentBehavior="automatic">
          <WineRowSummary />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});

export default App;
