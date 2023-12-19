import {StyleSheet, Text, View} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../../App.tsx";
import {useTheme} from "@react-navigation/native";

interface BottleSummaryProps {
    name: string,
    vintageYear: number,
    color: string
}

export const BottleSummary = ({name, vintageYear, color}: BottleSummaryProps) => {

    const { colors } = useTheme();

    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
            backgroundColor: colors.card,
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10
        }}>
            <Text style={{
                color: colors.text,
            }}>Bottle {color}</Text>
            <View>
                <Text style={{
                    color: colors.text,
                    fontSize: 18
                }}>{name}</Text>
                <Text style={{
                    color: colors.text,
                    fontSize: 12,
                }}>{vintageYear}</Text>
            </View>
        </View>
    )
}