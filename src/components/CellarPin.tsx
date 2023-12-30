import {View} from "react-native";

interface CellarPinProps {
    pinKey: number,
    color: string
}

export const CellarPin = ({color, pinKey}: CellarPinProps) => {
    return (
        <View
            key={pinKey}
            style={{
                width: 50,
                height: 50,
                borderStyle: "solid",
                borderColor: "#3C74A8",
                borderWidth: 3,
                borderRadius: 50,
                backgroundColor: color
            }}
        />
    )
}