import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import WineRowSummary from "../components/WineRowSummary.tsx";
import React from "react";
import { ParamListBase} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import CellarFill from "../components/CellarFill.tsx";

const Home = ({navigation}: NativeStackScreenProps<ParamListBase>) => {
    return <SafeAreaView>
        <StatusBar/>
        <ScrollView
            style={styles.container}
            contentInsetAdjustmentBehavior="automatic">
            <CellarFill />
            <WineRowSummary/>
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});

export default Home;