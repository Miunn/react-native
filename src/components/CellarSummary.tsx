import {Dimensions, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {useEffect, useState} from "react";

interface CellarSummaryProps {
    capacity: number
}

const CellarSummary = ({capacity}: CellarSummaryProps) => {

    const {colors} = useTheme();
    const screenWidth = Dimensions.get("screen").width;

    let elements = [];
    const amountInRow = Math.floor(screenWidth / 74);

    for (let i = 0; i < capacity; i++) {
        elements.push(
            <View
                key={i}
                style={{
                    width: 50,
                    height: 50,
                    marginLeft: 4,
                    marginRight: 4,
                    borderStyle: "solid",
                    borderColor: "#3C74A8",
                    borderWidth: 3,
                    borderRadius: 50
                }}
            />
        )
    }

    return (
        <View style={{
            marginLeft: 4,
            marginRight: 4,

            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 8
        }}>
            {elements.map((element) =>
                element
            )}
        </View>
    )
}

export default CellarSummary;