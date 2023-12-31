import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

type IconRoundedRectangleProps = {
    iconSource: ImageSourcePropType,
    text: string,
}

const IconRoundedRectangle = (props: IconRoundedRectangleProps) => {

    const { colors } = useTheme();

    return <View style={styles.container}>
        <Image
            style={styles.icon}
            source={props.iconSource}
        />
        <Text style={{
            color: colors.text
        }}>{props.text}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",    // width fit-content
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderStyle: "solid",
        borderColor: "#f00",
        borderRadius: 20,
        borderWidth: 1
    },
    icon: {
        marginRight: 5,
    },
    text: {
        fontSize: 10,
        color: "black"
    }
});

export default IconRoundedRectangle;