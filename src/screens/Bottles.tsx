import BottlesList from "../components/BottlesList.tsx";
import React, {useState} from "react";
import {Appbar, Searchbar} from "react-native-paper";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import {NavigationProp} from "@react-navigation/native";

interface BottlesProps {
    navigation: NavigationProp<any>
    route: any
}

const Bottles = ({navigation, route}: BottlesProps) => {

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SafeAreaView style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title={route.params.title} />
                <Appbar.Action icon="magnify" onPress={() => {}} />
            </Appbar.Header>
            <BottlesList/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        margin: 10
    }
})

export default Bottles;