import React, {useState} from 'react';
import {Home} from "./src/screens/Home.tsx";
import {useColorScheme} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {darkTheme, theme} from "./src/theme.ts";

export const ThemeContext = React.createContext({});

function App(): React.JSX.Element {

    const [darkMode, setDarkMode] = useState(false);

    const Stack = createStackNavigator();
    const colorScheme = useColorScheme();

    return (
        <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={"HomeScreen"} component={Home}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeContext.Provider>
    );
}

export default App;
