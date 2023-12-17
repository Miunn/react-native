import React from 'react';
import {Home} from "./src/screens/Home.tsx";
import {Text, useColorScheme, View} from "react-native";

function App(): React.JSX.Element {

    const colorScheme = useColorScheme();

    return (
        <View>
            <Home/>
            <Text>{colorScheme}</Text>
        </View>
    );
}

export default App;
