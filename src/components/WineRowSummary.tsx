import {StyleSheet, View} from "react-native";
import IconRoundedRectangle from "./IconRoundedRectangle.tsx";
import {Chip} from "react-native-paper";

interface WineRowSummaryProps {
    redAmount: number,
    whiteAmount: number,
    pinkAmount: number
}

const WineRowSummary = ({redAmount, whiteAmount, pinkAmount}: WineRowSummaryProps) => {
    return <View style={styles.container}>
        <Chip icon={"glass-wine"}>{redAmount} Rouge</Chip>
        <Chip icon={"glass-wine"}>{whiteAmount} Blanc</Chip>
        <Chip icon={"glass-wine"}>{pinkAmount} Rosé</Chip>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
    }
});

export default WineRowSummary;