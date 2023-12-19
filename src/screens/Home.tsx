import 'react-native-gesture-handler';
import React, {useContext} from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text} from "react-native";
import CellarFill from "../components/CellarFill.tsx";
import WineRowSummary from "../components/WineRowSummary.tsx";
import {BottleSummary} from "../components/BottleSummary.tsx";
import {FAB} from "@rneui/themed";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {ThemeContext} from "../../App.tsx";
import {useTheme} from "@react-navigation/native";

export const Home = ({navigation}: NativeStackScreenProps<any>) => {

    const { colors } = useTheme();

    return <SafeAreaView>
        <StatusBar/>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>

            <CellarFill
                bottles={30}
                capacity={50}
            />
            <WineRowSummary/>

            <Text style={{
                color: colors.text
            }}>Dernières bouteilles rentrées</Text>
            <BottleSummary
                name={"Grand cru bourgogne"}
                vintageYear={2018}
                color={"red"} />

            <FAB
                title="Ajouter une bouteille"
                icon={{name: "add", color: "white"}}
                color="blue"
            />
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 10,
    },
    title: {
        fontSize: 40,
    }
});