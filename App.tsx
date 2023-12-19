import React, {useState} from 'react';
import {Home} from "./src/screens/Home.tsx";
import {useColorScheme} from "react-native";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    }
}

export const ThemeContext = React.createContext({});

function App(): React.JSX.Element {

    const [darkMode, setDarkMode] = useState(false);

    const Stack = createStackNavigator();

    return (
        <NavigationContainer theme={Theme}>
            <Stack.Navigator>
                <Stack.Screen name={"Ma cave"} component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
