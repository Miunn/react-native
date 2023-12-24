import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import CellarFill from "../components/CellarFill.tsx";
import WineRowSummary from "../components/WineRowSummary.tsx";
import {BottleSummary} from "../components/BottleSummary.tsx";
import {FAB} from "react-native-paper";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {useIsFocused, useTheme} from "@react-navigation/native";
import {getBottles, getDBConnection, initDB, insertBottles} from "../services/db-interface.ts";
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
    }, [loadBottlesCallback, isFocused]);

    return <SafeAreaView>
        <StatusBar/>
        <ScrollView style={styles.container} contentContainerStyle={{rowGap: 40}}>

            <CellarFill
                bottles={bottles.length}
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

                {bottles.map((bottle) => (
                    <BottleSummary
                        key={bottle.id}
                        name={bottle.name}
                        vintageYear={bottle.vintageYear}
                        color={bottle.color} />
                ))}

            </View>

            <FAB
                label="Ajouter une bouteille"
                icon={"plus"}
                onPress={() => navigation.navigate("AddBottle")}
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