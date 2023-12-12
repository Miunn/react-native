import {Image, StyleSheet, Text, View} from "react-native";

type IconRoundedRectangleProps = {
    text: string,
}

const IconRoundedRectangle = (props: IconRoundedRectangleProps) => {
    return <View style={styles.container}>
        <Image
            source={require('./../assets/wine_bar.png')}
        />
        <Text>{props.text}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        flexDirection: "row",
        padding: 10,
        borderStyle: "solid",
        borderColor: "#f00",
        borderRadius: 20,
        borderWidth: 2
    }
});

export default IconRoundedRectangle;