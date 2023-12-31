import {Pressable, View} from "react-native";
import {BottleType} from "../models/BottleType.tsx";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

interface CellarPinProps {
    bottle: BottleType|undefined,
    navigation: NativeStackNavigationProp<any>,
}

const CellarPin = ({bottle, navigation}: CellarPinProps) => {
    return (
        <Pressable
            onPress={() => {
                if (bottle !== undefined) {
                    navigation.navigate("bottle", {bottle: bottle})
                }
            }}
            style={{
                width: 50,
                height: 50,
                borderStyle: "solid",
                borderColor: "#3C74A8",
                borderWidth: 3,
                borderRadius: 50,
                backgroundColor: bottle?.color
            }}

        />
    )
}

export default CellarPin;