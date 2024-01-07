import {Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Button, Card, Dialog, Icon, PaperProvider, Portal, TouchableRipple} from "react-native-paper";
import {deleteBottle, getDBConnection} from "../services/db-interface.ts";
import {BottleType} from "../models/BottleType.tsx";
import {PressableOpacity} from "react-native-pressable-opacity";
import {useCallback, useState} from "react";

interface BottleSummaryProps {
    bottle: BottleType,
    navigation: any
}

export const BottleSummary = ({bottle, navigation}: BottleSummaryProps) => {

    const {colors} = useTheme();
    const icon = (props: { size: number }) => <Icon source={"bottle-wine"} size={20}/>
    const [isRemoveDialogVisible, setRemoveDialogVisisble] = useState(false);


    const deleteBottleFromDB = async () => {
        const db = await getDBConnection();
        await deleteBottle(db, bottle.id!);
    };

    let colorString;
    switch (bottle.color) {
        case 'red':
            colorString = "Rouge";
            break;
        case 'white':
            colorString = "Blanc";
            break;
        case 'pink':
            colorString = "Rosé";
            break;
        default:
            colorString = `Vin ${bottle.color}`;
    }

    return (
        <Card
            style={{
                margin: 10
            }}
            onPress={() => navigation.navigate("bottle", {bottle: bottle})}>
            <Card.Title title={bottle.name} subtitle={`${bottle.vintageYear} - ${colorString}`} left={icon}/>
            <Card.Content>
                <Text style={{
                    color: colors.text
                }}>Content</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode={"text"} onPress={() => setRemoveDialogVisisble(true)}>Sortir la bouteille</Button>
            </Card.Actions>

            <Portal>
                <Dialog visible={isRemoveDialogVisible} onDismiss={() => setRemoveDialogVisisble(false)}>
                    <Dialog.Title>Sortir la bouteille ?</Dialog.Title>
                    <Dialog.Content>
                        <Text>{bottle.name} de {bottle.vintageYear} sera sorti de la cave.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setRemoveDialogVisisble(false)}>Annuler</Button>
                        <Button onPress={() => setRemoveDialogVisisble(false)}>Sortir</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Card>
    )
}