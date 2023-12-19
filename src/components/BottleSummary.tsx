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
            backgroundColor: colors.card
        }}>
            <Text style={{
                color: colors.text
            }}>Bottle {color}</Text>
            <View>
                <Text style={{
                    color: colors.text
                }}>{name}</Text>
                <Text style={{
                    color: colors.text
                }}>{vintageYear}</Text>
            </View>
        </View>
    )
}