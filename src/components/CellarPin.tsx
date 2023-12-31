import {View} from "react-native";
import {BottleType} from "../models/BottleType.tsx";

interface CellarPinProps {
    bottle: BottleType|undefined,
}

const CellarPin = ({bottle}: CellarPinProps) => {
    return (
        <View
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