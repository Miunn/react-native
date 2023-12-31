import {View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {BottleType} from "../models/BottleType.tsx";
import {JSX, useEffect, useState} from "react";
import CellarPin from "./CellarPin.tsx";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

interface CellarSummaryProps {
    capacity: number,
    bottles: BottleType[],
    navigation: NativeStackNavigationProp<any>
}

const CellarSummary = ({capacity, bottles, navigation}: CellarSummaryProps) => {

    const {colors} = useTheme();
    const [elements, setElements] = useState<{ id:number, bottle:BottleType|undefined }[]>([]);
    const [pinId, setPinId] = useState(0);

    useEffect(() => {
        let arr: {id:number, bottle:BottleType|undefined}[] = [];
        for (let i = 0; i < capacity; i++) {
            let curr = {
                id: i,
                bottle : bottles[i],
            };

            arr.push(curr);
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
                <CellarPin
                    navigation={navigation}
                    key={element.id}
                    bottle={element.bottle}
                />
            )}
        </View>
    )
}

export default CellarSummary;