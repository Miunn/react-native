import {Circle, Fill, Group, Path, PathOp, Skia, Vector} from "@shopify/react-native-skia";
import {useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import React, {useEffect, useMemo} from "react";

interface Ring {
    size: number,
    totalProgress: number,
    background: string,
    colors: string[],
}

interface RingProps {
    center: Vector,
    strokeWidth: number,
    ring: Ring
}

export const Ring = ({center, strokeWidth, ring: {size, totalProgress, background, colors}}: RingProps) => {
    const radius = size / 2 - strokeWidth / 2;
    const animValue = useSharedValue(0);

    const clippingMask = useMemo(() => {
        const outerCircle = Skia.Path.Make();
        outerCircle.addCircle(center.x, center.y, size / 2);

        const innerCircle = Skia.Path.Make();
        innerCircle.addCircle(center.x, center.y, size / 2 - strokeWidth);

        return Skia.Path.MakeFromOp(outerCircle, innerCircle, PathOp.Difference)!;
    }, [center.x, center.y, size, strokeWidth]);

    const fullPath = useMemo(() => {
        const path = Skia.Path.Make();

        const boundingBox = Skia.XYWHRect(center.x - radius, center.y - radius, 2 * radius, 2 * radius);
        path.addArc(boundingBox, 0, 360 * totalProgress);
        return path;
    }, [center.x, center.y, totalProgress]);

    const currentPath = useDerivedValue(() => {
        if (animValue.value < 1) {
            return fullPath.copy().trim(0, animValue.value, false)!;
        }
        return fullPath;
    });

    const head = useDerivedValue(() => {
        return currentPath.value.getLastPt();
    });

    useEffect(() => {
        animValue.value = withTiming(1, {duration: 1000});
    }, [animValue]);

    return (
        <Group transform={[{rotate: -Math.PI / 2}]} origin={center}>
            <Group clip={clippingMask}>
                <Fill color={background}/>
                <Circle
                    r={strokeWidth / 2}
                    c={fullPath.getPoint(0)}
                    color={colors[0]}
                />
                <Path
                    path={currentPath}
                    strokeWidth={strokeWidth}
                    color={colors[0]}
                    style={"stroke"}
                />
                <Circle
                    r={strokeWidth / 2}
                    c={head}
                    color={colors[0]}
                />
            </Group>
        </Group>
    )
}