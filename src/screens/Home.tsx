import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import CellarFill from "../components/CellarFill.tsx";
import WineRowSummary from "../components/WineRowSummary.tsx";
import {BottleSummary} from "../components/BottleSummary.tsx";
import {FAB} from "react-native-paper";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {useIsFocused, useTheme} from "@react-navigation/native";
import {getBottles, getDBConnection, initDB} from "../services/db-interface.ts";
import {BottleType} from "../models/Bottle.tsx";

export const Home = ({navigation}: NativeStackScreenProps<any>) => {

    const isFocused = useIsFocused();
    const {colors} = useTheme();

    const [bottles, setBottles] = useState<BottleType[]>([]);
    const loadBottlesCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await initDB(db);
            const storedBottles = await getBottles(db);
            setBottles(storedBottles);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        loadBottlesCallback();
    }, [loadBottlesCallback, isFocused, bottles]);

    return <SafeAreaView style={{flex: 1}}>
        <StatusBar/>
        <ScrollView style={styles.container} contentContainerStyle={{rowGap: 30, paddingBottom: 100}}>

            <CellarFill
                bottles={bottles.length}
                capacity={50}
                style={{
                    marginTop: 30,
                    marginLeft: 10,
                    marginRight: 10,
                }}
            />

            <WineRowSummary
                redAmount={2}
                whiteAmount={0}
                pinkAmount={0}
            />

            <View>
                <Text style={{
                    color: colors.text,
                    fontSize: 20,
                    margin: 10
                }}>Dernières bouteilles enregistrées</Text>

                {bottles.map((bottle) => (
                    <BottleSummary
                        key={bottle.id}
                        bottle={bottle} />
                ))}

            </View>
        </ScrollView>
        <FAB
            label="Ajouter une bouteille"
            icon={"plus"}
            onPress={() => navigation.navigate("addBottle")}
            style={styles.addFab}
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 40,
    },
    addFab: {
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
    }
});