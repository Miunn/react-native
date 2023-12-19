import {StyleSheet, Text, View} from "react-native";
import {ProgressCircle} from "./ProgressCircle.tsx";
import React from "react";
import {useTheme} from "@react-navigation/native";

interface CellarFillProps {
    bottles: number,
    capacity: number
}

const CellarFill = ({bottles, capacity}: CellarFillProps) => {

    const { colors } = useTheme();

    return <View style={styles.container}>
        <ProgressCircle
            size={100}
            strokeWidth={10}
            progress={bottles/capacity}
            duration={1000}
        />

        <Text style={{
            color: colors.text,
            fontSize: 30
        }}>{bottles} bouteilles</Text>
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