import React, {useState} from 'react';
import {Home} from "./src/screens/Home.tsx";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import AddBottle from "./src/screens/AddBottle.tsx";
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Icon} from "react-native-paper";
import Bottles from "./src/screens/Bottles.tsx";

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

function HomeStackScreen() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name={"cave"} component={Home} options={{title: "Ma cave"}}/>
            <Stack.Screen name={"addBottle"} component={AddBottle} options={{title: "Ajouter une bouteille"}}/>
        </Stack.Navigator>
    )
}

function BottlesStackScreen() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name={"cave"} component={Bottles} options={{title: "Ma cave"}}/>
            <Stack.Screen name={"addBottle"} component={AddBottle} options={{title: "Ajouter une bouteille"}}/>
        </Stack.Navigator>
    )
}

function App(): React.JSX.Element {

    const Tab = createMaterialBottomTabNavigator();

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={Theme}>
                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color}) => {
                        let iconName = "";

                        switch (route.name) {
                            case "caveTab":
                                iconName = focused ? "storefront" : "storefront-outline"
                                break;
                            case "bottlesTab":
                                iconName = focused ? "bottle-wine" : "bottle-wine-outline"
                                break;
                        }


                        return <Icon source={iconName} size={20} color={color} />
                    }
                })}>
                    <Tab.Screen name={"caveTab"} component={HomeStackScreen} options={{title: "Ma cave"}}/>
                    <Tab.Screen name={"bottlesTab"} component={BottlesStackScreen} options={{title: "Mes bouteilles"}}/>
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
