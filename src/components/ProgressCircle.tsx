import {StyleSheet, Dimensions} from "react-native";
import React from "react";
import {Canvas, vec} from "@shopify/react-native-skia";
import {Ring} from "./Ring.tsx";

const color = (r: number, g: number, b: number) => {
    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
}

const {width, height} = Dimensions.get("window");
const strokeWidth = 40;


const center= vec(width / 2, height / 2);

const ProgressCircle = () => {
    return (
        <Canvas style={{flex: 1}}>
            <Ring
                ring={{
                    size: width,
                    totalProgress: 0.7,
                    background: color(0.016, 0.227, 0.212),
                    colors: [color(0.008, 1, 0.659), color(0, 0.847, 1)],
                }}
                center={center}
                strokeWidth={strokeWidth}
            />
        </Canvas>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
    },
});

export default ProgressCircle;