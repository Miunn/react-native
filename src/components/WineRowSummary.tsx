import {StyleSheet, View} from "react-native";
import IconRoundedRectangle from "./IconRoundedRectangle.tsx";
import {Chip} from "react-native-paper";
import {useTranslation} from "react-i18next";

interface WineRowSummaryProps {
    redAmount: number,
    whiteAmount: number,
    pinkAmount: number
}

const WineRowSummary = ({redAmount, whiteAmount, pinkAmount}: WineRowSummaryProps) => {
    const { t } = useTranslation();

    return <View style={styles.container}>
        <Chip icon={"glass-wine"}>{redAmount} {t('redWine')}</Chip>
        <Chip icon={"glass-wine"}>{whiteAmount} {t('whiteWine')}</Chip>
        <Chip icon={"glass-wine"}>{pinkAmount} {t('pinkWine')}</Chip>
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