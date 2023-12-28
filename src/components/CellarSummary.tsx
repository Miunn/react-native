import {Dimensions, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

interface CellarSummaryProps {
    capacity: number
}

const CellarSummary = ({capacity}: CellarSummaryProps) => {

    const {colors} = useTheme();
    const screenWidth = Dimensions.get("screen").width;

    let elements = [];

    for (let i = 0; i < capacity; i++) {
        elements.push(
            <View
                key={i}
                style={{
                    width: 50,
                    height: 50,
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
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            alignSelf: "center",
            backgroundColor: "green"
        }}>
            {elements.map((element) =>
                element
            )}
        </View>
    )
}

export default CellarSummary;