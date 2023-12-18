import {StyleSheet, Text, View} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../../App.tsx";

interface BottleSummaryProps {
    name: string,
    vintageYear: number,
    color: string
}

export const BottleSummary = ({name, vintageYear, color}: BottleSummaryProps) => {

    const theme = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <Text
                style={{
                    color: theme.colors.foreground
                }}
            >Bottle {color}</Text>
            <View>
                <Text
                    style={{
                        color: theme.colors.foreground
                    }}
                >{name}</Text>
                <Text
                    style={{
                        color: theme.colors.foreground
                    }}
                >{vintageYear}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    title: {
        fontSize: 18
    },
    year: {
        fontSize: 14
    }
});