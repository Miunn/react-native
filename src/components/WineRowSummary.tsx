import {StyleSheet, View} from "react-native";
import IconRoundedRectangle from "./IconRoundedRectangle.tsx";

const WineRowSummary = () => {
    return <View style={styles.container}>
        <IconRoundedRectangle iconSource={require('./../assets/wine_bar.png')} text={'Vin rouge'} />
        <IconRoundedRectangle iconSource={require('./../assets/wine_bar.png')} text={'Vin rosé'} />
        <IconRoundedRectangle iconSource={require('./../assets/wine_bar.png')} text={'Vin blanc'} />
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