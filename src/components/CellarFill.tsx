import {StyleSheet, View} from "react-native";
import {ProgressCircle} from "./ProgressCircle.tsx";
import React from "react";
import {Text} from "react-native-paper";

interface CellarFillProps {
    bottles: number,
    capacity: number,
    style: object
}

const CellarFill = ({bottles, capacity, style}: CellarFillProps) => {

    let label = `${bottles} bouteilles`;

    if (bottles == 0) {
        label = "Aucune bouteille";
    } else if (bottles == 1) {
        label = `${bottles} bouteille`;
    }

    return <View style={{...styles.container, ...style}}>
        <ProgressCircle
            size={100}
            strokeWidth={10}
            progress={bottles/capacity}
            duration={1000}
        />

        <Text style={{
            fontSize: 30
        }}>{label}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 20,
    },
});

export default CellarFill;