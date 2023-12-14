import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import React from "react";
import { ParamListBase} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import ProgressCircle from "../components/ProgressCircle.tsx";
import {Canvas, Circle, Group} from "@shopify/react-native-skia";

const Home = ({navigation}: NativeStackScreenProps<ParamListBase>) => {
    {/*return <SafeAreaView>
        <StatusBar/>
        {/*<ScrollView
            style={styles.container}
            contentInsetAdjustmentBehavior="automatic">
            <CellarFill />
            <WineRowSummary/>
        </ScrollView>
        <ProgressCircle />
    </SafeAreaView>*/}

    return <ProgressCircle />
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});

export default Home;