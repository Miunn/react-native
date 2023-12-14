import {Fill, Group, Path, PathOp, Skia, Vector} from "@shopify/react-native-skia";
import {useMemo} from "react";


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

    const clippingMask = useMemo(() => {
        const outerCircle = Skia.Path.Make();
        outerCircle.addCircle(center.x, center.y, size / 2);

        const innerCircle = Skia.Path.Make();
        innerCircle.addCircle(center.x, center.y, size / 2 - strokeWidth / 2);

        return Skia.Path.MakeFromOp(outerCircle, innerCircle, PathOp.Difference)!;
    }, [center.x, center.y, size, strokeWidth]);

    return (
        <Group clip={clippingMask}>
            <Fill color={background} />
        </Group>
    )
}