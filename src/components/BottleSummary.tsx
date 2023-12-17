import {StyleSheet, Text, View} from "react-native";

interface BottleSummaryProps {
    name: string,
    vintageYear: number,
    color: string
}

export const BottleSummary = ({name, vintageYear, color}: BottleSummaryProps) => {
    return (
        <View style={styles.container}>
            <Text>Bottle {color}</Text>
            <View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.year}>{vintageYear}</Text>
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