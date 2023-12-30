import {View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {BottleType} from "../models/BottleType.tsx";
import {JSX, useEffect, useState} from "react";
import {CellarPin} from "./CellarPin.tsx";

interface CellarSummaryProps {
    capacity: number,
    bottles: BottleType[],
}

const CellarSummary = ({capacity, bottles}: CellarSummaryProps) => {

    const {colors} = useTheme();
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [pinId, setPinId] = useState(0);

    useEffect(() => {
        let arr: JSX.Element[] = [];
        for (let i = 0; i < capacity; i++) {
            let pinColor = "transparent";
            if (bottles[i]) {
                switch (bottles[i].color) {
                    case "red":
                        pinColor = "red";
                        break;
                    case "pink":
                        pinColor = "pink";
                        break;
                    case "white":
                        pinColor = "white";
                        break;
                }
            }

            arr.push(
                <CellarPin
                    pinKey={pinId}
                    color={pinColor}
                />
            )

            setPinId(pinId + 1);
        }

        setElements(arr);
    }, [capacity, bottles]);

    return (
        <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            alignSelf: "center",
        }}>
            {elements.map((element) =>
                element
            )}
        </View>
    )
}

export default CellarSummary;