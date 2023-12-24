import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {useTheme} from "@react-navigation/native";
import React, {useState} from "react";
import {TextInput, RadioButton, FAB, Snackbar} from "react-native-paper";
import {getDBConnection, initDB, insertBottles} from "../services/db-interface.ts";

interface AddBottleProps {
    navigation: NativeStackScreenProps<any>,
    route: any,
}

const AddBottle = ({navigation}: NativeStackScreenProps<any>) => {
    const {colors} = useTheme();

    const [name, setName] = useState("");
    const [vintageYear, setVintageYear] = useState("");
    const [color, setColor] = useState('red');

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");

    const saveToDb = async () => {
        if (name == "") {
            setSnackbarText("Appellation requise");
            setSnackbarVisible(true);
            return;
        } else if (vintageYear == "") {
            setSnackbarText("Millésime requis");
            setSnackbarVisible(true);
            return;
        }

        const db = await getDBConnection();
        await initDB(db);
        await insertBottles(db, [{
            name: name,
            vintageYear: parseInt(vintageYear),
            color: color
        }]);
        navigation.goBack();
    }

    return <SafeAreaView style={{flex: 1}}>
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

            <FAB
                icon={"content-save"}
                label={"Sauvegarder"}
                onPress={saveToDb}
                mode={"flat"}
                style={{
                    margin: 10
                }}
            />
        </ScrollView>
        <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} style={{position: "absolute", bottom: 10}}>{snackbarText}</Snackbar>
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