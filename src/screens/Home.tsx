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
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

interface HomeProps {
    navigation: NativeStackNavigationProp<any>,
    route: any
}

export const Home = ({navigation, route}: HomeProps) => {

    const isFocused = useIsFocused();
    const {colors} = useTheme();

    const [capacity, setCapacity] = useState(50);
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

    const bottleAmount = (color: string): number => {
        let amount = 0
        for (let bottle of bottles) {
            console.log(bottle)
            if (bottle.color === color) {
                amount++
            }
        }
        return amount
    }

    useEffect(() => {
        loadBottlesCallback();
    }, [loadBottlesCallback, isFocused]);

    return <SafeAreaView style={{flex: 1}}>
        <Appbar.Header>
            <Appbar.Content title={route.params.title} />
            <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        <ScrollView contentContainerStyle={{rowGap: 30, paddingBottom: 60}}>

            <CellarFill
                bottles={bottles.length}
                capacity={capacity}
                style={{
                    marginTop: 30,
                    marginLeft: 10,
                    marginRight: 10,
                }}
            />

            <WineRowSummary
                redAmount={bottleAmount("red")}
                whiteAmount={bottleAmount("white")}
                pinkAmount={bottleAmount("pink")}
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
                        bottle={bottle}
                        navigation={navigation}
                    />
                ))}

            </View>

            <CellarSummary
                navigation={navigation}
                capacity={capacity}
                bottles={bottles}
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