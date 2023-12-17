import React from "react";
import {Canvas, vec, useFont} from "@shopify/react-native-skia";
import {Ring} from "./Ring.tsx";
import {ProgressText} from "./ProgressText.tsx";

const color = (r: number, g: number, b: number) => `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
const fontSize = 32

interface ProgressCircleProps {
    size: number,
    strokeWidth: number,
    progress: number,
    duration: number
}

export const ProgressCircle = ({size, strokeWidth, progress, duration}: ProgressCircleProps) => {

    const font = useFont(require("./../assets/fonts/Poppins/Poppins-Regular.ttf"), fontSize);

    const center = vec(size / 2, size / 2);

    if (font == null) {
        return null;
    }

    return (
        <Canvas style={{width: size, height: size, backgroundColor: "red"}}>
            <Ring
                ring={{
                    size: size,
                    totalProgress: progress,
                    background: color(0.016, 0.227, 0.212),
                    colors: [color(0.008, 1, 0.659), color(0, 0.847, 1)]
                }}
                center={center}
                strokeWidth={strokeWidth}
                duration={duration}
            />
            <ProgressText
                progress={progress}
                font={font}
                centerX={size/2}
                y={size/2 + fontSize/2 - 5}
                duration={duration}
            />
        </Canvas>
    )
}