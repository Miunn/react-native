import {StyleSheet, View} from "react-native";
import {ProgressCircle} from "./ProgressCircle.tsx";
import React from "react";
import {Text} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {format} from "react-string-format";

interface CellarFillProps {
    bottles: number,
    capacity: number,
    style: object
}

const CellarFill = ({bottles, capacity, style}: CellarFillProps) => {

    const {t} = useTranslation();
    let label = format(t('bottleSum'), bottles, bottles == 1 ? '' : 's');

    if (bottles == 0) {
        label = t('noBottles');
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