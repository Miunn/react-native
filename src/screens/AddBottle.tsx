import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import React, {useState} from "react";
import {TextInput, RadioButton, FAB, Snackbar, Appbar, useTheme, Text} from "react-native-paper";
import {getDBConnection, initDB, insertBottles} from "../services/db-interface.ts";
import {useTranslation} from "react-i18next";

interface AddBottleProps {
    navigation: NativeStackScreenProps<any>,
    route: any,
}

const AddBottle = ({navigation}: NativeStackScreenProps<any>) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const {colors} = useTheme();

    const [name, setName] = useState("");
    const [signature, setSignature] = useState("");
    const [vintageYear, setVintageYear] = useState("");
    const [color, setColor] = useState('red');

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");

    const saveToDb = async () => {
        if (name == "") {
            setSnackbarText(t('bottleNameRequired'));
            setSnackbarVisible(true);
            return;
        } else if (vintageYear == "") {
            setSnackbarText(t('bottleYearRequired'));
            setSnackbarVisible(true);
            return;
        }

        const db = await getDBConnection();
        await initDB(db);
        await insertBottles(db, [{
            name: name,
            signature: signature,
            vintageYear: parseInt(vintageYear),
            color: color
        }]);
        navigation.goBack();
    }

    return <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()}/>
            <Appbar.Content title={t('addBottle')}/>
        </Appbar.Header>
        <ScrollView>
            <TextInput
                label={t('bottleName')}
                value={name}
                onChangeText={setName}
                mode={"outlined"}
                style={styles.inputs}
            />
            <TextInput
                label={t('signature')}
                value={signature}
                onChangeText={setSignature}
                mode={"outlined"}
                style={styles.inputs}
            />
            <TextInput
                label={t('bottleYear')}
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
                <View style={styles.inputs}>
                    <View style={styles.radioContainer}>
                        <RadioButton value={'red'}/>
                        <Text>{t('redWine')}</Text>
                    </View>

                    <View style={styles.radioContainer}>
                        <RadioButton value={'white'}/>
                        <Text>{t('whiteWine')}</Text>
                    </View>

                    <View style={styles.radioContainer}>
                        <RadioButton value={'pink'}/>
                        <Text>{t('pinkWine')}</Text>
                    </View>
                </View>
            </RadioButton.Group>

            <FAB
                icon={"content-save"}
                label={t('save')}
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