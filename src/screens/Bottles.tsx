import BottlesList from "../components/BottlesList.tsx";
import React, {useState} from "react";
import {Appbar, FAB, Searchbar, useTheme} from "react-native-paper";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import {NavigationProp} from "@react-navigation/native";

interface BottlesProps {
    navigation: NavigationProp<any>
    route: any
}

const Bottles = ({navigation, route}: BottlesProps) => {

    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
            <Appbar.Header>
                <Appbar.Content title={route.params.title}/>
                <Appbar.Action icon="magnify" onPress={() => {
                }}/>
            </Appbar.Header>
            <BottlesList
                navigation={navigation}
            />
            <FAB
                icon={"plus"}
                onPress={() => navigation.navigate("addBottle")}
                style={styles.addFab}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        margin: 10
    },
    addFab: {
        position: "absolute",
        bottom: 10,
        right: 10,
    }
})

export default Bottles;