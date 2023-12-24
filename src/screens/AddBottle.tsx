import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {useTheme} from "@react-navigation/native";
import {useState} from "react";
import {TextInput, RadioButton} from "react-native-paper";

interface AddBottleProps {
    navigation: NativeStackScreenProps<any>,
    route: any,
}

const AddBottle = ({navigation, route}: AddBottleProps) => {
    const {colors} = useTheme();

    const [name, setName] = useState("");
    const [vintageYear, setVintageYear] = useState("2020");
    const [color, setColor] = useState('red');

    return <SafeAreaView>
        <StatusBar/>
        <ScrollView>
            <TextInput
                label={"Appellation"}
                value={name}
                onChangeText={setName}
                mode={"outlined"}
                style={styles.inputs}
            />
            <TextInput
                label={"Millésime"}
                inputMode={"numeric"}
                keyboardType={"numeric"}
                value={vintageYear}
                onChangeText={setVintageYear}
                mode={"outlined"}
                style={styles.inputs}
            />


            <RadioButton.Group
                onValueChange={setColor}
                value={color}>
                <View style={styles.radioContainer}>
                    <View style={styles.radioContainer}>
                        <RadioButton value={'red'}/>
                        <Text
                            style={{
                                color: colors.text
                            }}>Rouge</Text>
                    </View>

                    <View style={styles.radioContainer}>
                        <RadioButton value={'white'}/>
                        <Text
                            style={{
                                color: colors.text
                            }}>
                            Blanc</Text>
                    </View>

                    <View style={styles.radioContainer}>
                        <RadioButton value={'pink'}/>
                        <Text
                            style={{
                                color: colors.text
                            }}>Rosé</Text>
                    </View>
                </View>
            </RadioButton.Group>
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    radioGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "auto",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputs: {
        margin: 12,
    }
});

export default AddBottle;