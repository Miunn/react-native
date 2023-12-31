import {SafeAreaView, Text} from "react-native";
import {Appbar} from "react-native-paper";
import React from "react";
import {BottleType} from "../models/BottleType.tsx";

const Bottle = ({navigation, route}: any) => {

    const bottle: BottleType = route.params.bottle;

    return (
        <SafeAreaView style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={bottle.name}/>
            </Appbar.Header>
            <Text>{bottle.name}</Text>
        </SafeAreaView>
    )
}

export default Bottle;