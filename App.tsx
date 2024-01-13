import React, {useEffect, useState} from 'react';
import {Home} from "./src/screens/Home.tsx";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import AddBottle from "./src/screens/AddBottle.tsx";
import Bottle from "./src/screens/Bottle.tsx";
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Icon, PaperProvider} from "react-native-paper";
import Bottles from "./src/screens/Bottles.tsx";
import CameraScreen from "./src/screens/CameraScreen.tsx";
import * as RNLocalize from 'react-native-localize';
import i18n from "./i18n";

function HomeStackScreen() {
    const Stack = createStackNavigator();

    return (
        <PaperProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"cave"} component={Home} options={{title: "Ma cave"}}
                              initialParams={{title: "Ma cave"}}/>
                <Stack.Screen name={"addBottle"} component={AddBottle} options={{title: "Ajouter une bouteille"}}
                              initialParams={{title: "Ajouter une bouteille"}}/>
                <Stack.Screen name={"bottle"} component={Bottle} initialParams={{title: "Bottle"}}/>
                <Stack.Screen name={"camera"} component={CameraScreen} initialParams={{title: "Prendre une photo"}}/>
            </Stack.Navigator>
        </PaperProvider>
    )
}

function BottlesStackScreen() {
    const Stack = createStackNavigator();

    return (
        <PaperProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"bottles"} component={Bottles} options={{title: "Mes bouteilles"}}
                              initialParams={{title: "Mes bouteilles"}}/>
                <Stack.Screen name={"addBottle"} component={AddBottle} options={{title: "Ajouter une bouteille"}}
                              initialParams={{title: "Ajouter une bouteille"}}/>
                <Stack.Screen name={"bottle"} component={Bottle} initialParams={{title: "Bottle"}}/>
                <Stack.Screen name={"camera"} component={CameraScreen} initialParams={{title: "Prendre une photo"}}/>
            </Stack.Navigator>
        </PaperProvider>
    )
}

function App(): React.JSX.Element {

    useEffect(() => {
        // Set the initial language based on device locale
        const locale = RNLocalize.getLocales()[0].languageCode;
        i18n.changeLanguage(locale);
    }, []);

    const Tab = createMaterialBottomTabNavigator();

    return (
        <SafeAreaProvider>
            <PaperProvider>
                <NavigationContainer>
                    <Tab.Navigator screenOptions={({route}) => ({
                        headerShown: false,
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


                            return <Icon source={iconName} size={20} color={color}/>
                        },
                    })}>
                        <Tab.Screen name={"caveTab"} component={HomeStackScreen} options={{title: "Ma cave"}}/>
                        <Tab.Screen name={"bottlesTab"} component={BottlesStackScreen}
                                    options={{title: "Mes bouteilles"}}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    );
}

export default App;
