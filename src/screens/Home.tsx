import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import CellarFill from "../components/CellarFill.tsx";
import WineRowSummary from "../components/WineRowSummary.tsx";
import {BottleSummary} from "../components/BottleSummary.tsx";
import {Appbar, FAB} from "react-native-paper";
import {NavigationProp, useIsFocused, useTheme} from "@react-navigation/native";
import {getBottles, getDBConnection, initDB} from "../services/db-interface.ts";
import {BottleType} from "../models/BottleType.tsx";
import CellarSummary from "../components/CellarSummary.tsx";

interface HomeProps {
    navigation: NavigationProp<any>,
    route: any
}

export const Home = ({navigation, route}: HomeProps) => {

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
        <Appbar.Header>
            <Appbar.Content title={route.params.title} />
            <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        <ScrollView contentContainerStyle={{rowGap: 30, paddingBottom: 60}}>

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

            <CellarSummary
                capacity={50}
            />
        </ScrollView>
        <FAB
            icon={"plus"}
            onPress={() => navigation.navigate("addBottle")}
            style={styles.addFab}
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
    },
    addFab: {
        position: "absolute",
        bottom: 10,
        right: 10,
    }
});