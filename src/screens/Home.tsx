import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import CellarFill from "../components/CellarFill.tsx";
import WineRowSummary from "../components/WineRowSummary.tsx";
import {BottleSummary} from "../components/BottleSummary.tsx";
import {Appbar, FAB, useTheme} from "react-native-paper";
import {useIsFocused} from "@react-navigation/native";
import {getBottles, getDBConnection, initDB} from "../services/db-interface.ts";
import {BottleType} from "../models/BottleType.tsx";
import CellarSummary from "../components/CellarSummary.tsx";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useTranslation} from "react-i18next";

interface HomeProps {
    navigation: NativeStackNavigationProp<any>,
    route: any,
}

export const Home = ({navigation, route}: HomeProps) => {

    const { t} = useTranslation();
    const theme = useTheme();
    const isFocused = useIsFocused();
    const {colors} = useTheme();

    const [capacity, setCapacity] = useState(50);
    const [bottles, setBottles] = useState<BottleType[]>([]);
    const loadBottlesCallback = async () => {
        try {
            const db = await getDBConnection();
            await initDB(db);
            const storedBottles = await getBottles(db);
            setBottles(storedBottles);
        } catch (err) {
            console.error(err);
        }
    };

    const bottleAmount = (color: string): number => {
        let amount = 0
        for (let bottle of bottles) {
            if (bottle.color === color) {
                amount++
            }
        }
        return amount
    }

    useEffect(() => {
        if (isFocused) {
            loadBottlesCallback();
        }
    }, [isFocused]);

    return <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Appbar.Header>
            <Appbar.Content title={route.params.title}/>
            <Appbar.Action icon="magnify" onPress={() => {
            }}/>
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
                    fontSize: 20,
                    margin: 10
                }}>{t('lastSavedBottles')}</Text>

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