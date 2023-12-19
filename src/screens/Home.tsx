import 'react-native-gesture-handler';
import React, {useContext} from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import CellarFill from "../components/CellarFill.tsx";
import WineRowSummary from "../components/WineRowSummary.tsx";
import {BottleSummary} from "../components/BottleSummary.tsx";
import {FAB} from "@rneui/themed";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {useTheme} from "@react-navigation/native";

export const Home = ({navigation}: NativeStackScreenProps<any>) => {

    const {colors} = useTheme();

    return <SafeAreaView>
        <StatusBar/>
        <ScrollView style={styles.container} contentContainerStyle={{rowGap: 40}}>

            <CellarFill
                bottles={30}
                capacity={50}
                style={{
                    marginTop: 30
                }}
            />

            <WineRowSummary/>

            <View>
                <Text style={{
                    color: colors.text,
                    fontSize: 20,
                    marginBottom: 10
                }}>Dernières bouteilles enregistrées</Text>
                <BottleSummary
                    name={"Grand cru bourgogne"}
                    vintageYear={2018}
                    color={"red"}/>
            </View>

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
        padding: 10,
    },
    title: {
        fontSize: 40,
    }
});