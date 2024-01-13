import {useTheme} from "@react-navigation/native";
import {Button, Card, Dialog, Icon, Portal, Text} from "react-native-paper";
import {deleteBottle, getDBConnection} from "../services/db-interface.ts";
import {BottleType} from "../models/BottleType.tsx";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {format} from "react-string-format";

interface BottleSummaryProps {
    bottle: BottleType,
    navigation: any
}

export const BottleSummary = ({bottle, navigation}: BottleSummaryProps) => {

    const {t} = useTranslation();
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
            colorString = t('redWine');
            break;
        case 'white':
            colorString = t('whiteWine');
            break;
        case 'pink':
            colorString = t('pinkWine');
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
                <Text>Content</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode={"text"} onPress={() => setRemoveDialogVisisble(true)}>Sortir la bouteille</Button>
            </Card.Actions>

            <Portal>
                <Dialog visible={isRemoveDialogVisible} onDismiss={() => setRemoveDialogVisisble(false)}>
                    <Dialog.Title>{t('takeOutAsk')}</Dialog.Title>
                    <Dialog.Content>
                        <Text>{format(t('takeOutSummary'), bottle.name, bottle.vintageYear)}</Text>
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