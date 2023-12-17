import {StyleSheet, Text, View} from "react-native";
import {ProgressCircle} from "./ProgressCircle.tsx";
import React from "react";

interface CellarFillProps {
    bottles: number,
    capacity: number
}

const CellarFill = ({bottles, capacity}: CellarFillProps) => {
    return <View style={styles.container}>
        <ProgressCircle
            size={100}
            strokeWidth={10}
            progress={bottles/capacity}
            duration={1000}
        />

        <Text style={styles.text}>{bottles} bouteilles</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 20,
        backgroundColor: "blue"
    },
    text: {
        backgroundColor: "purple",
        fontSize: 30
    }
});

export default CellarFill;