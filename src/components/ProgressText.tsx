import {useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import React, {useEffect} from "react";
import {SkFont, Text} from "@shopify/react-native-skia";

interface ProgressTextProps {
    progress: number,
    centerX: number,
    y: number,
    font: SkFont,
    duration: number
}

export const ProgressText = ({progress, centerX, y, font, duration}: ProgressTextProps) => {
    const animValue = useSharedValue(0);

    // Can't find a way to reposition text with update text and text width so center it based on last value
    const textWidth = font.getTextWidth(progress * 100 + "%");

    const currentText = useDerivedValue(() => {
        if (animValue.value < 1) {
            return Math.floor(progress*animValue.value * 100) + "%";
        }
        return progress * 100 + "%";
    });

    useEffect(() => {
        animValue.value = withTiming(1, {duration: duration});
    }, [animValue]);


    return (
        <Text
            text={currentText}
            font={font}
            x={centerX - textWidth/2}
            y={y}
        />
    )
}