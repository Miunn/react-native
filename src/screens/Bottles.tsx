import BottlesList from "../components/BottlesList.tsx";
import React, {useState} from "react";
import {Searchbar} from "react-native-paper";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";

const Bottles = () => {

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar/>
            <Searchbar
                placeholder={"Rechercher"}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchBar}
            />
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