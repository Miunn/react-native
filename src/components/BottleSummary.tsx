import {Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Button, Card, Icon, TouchableRipple} from "react-native-paper";
import {deleteBottle, getDBConnection} from "../services/db-interface.ts";
import {BottleType} from "../models/BottleType.tsx";
import {PressableOpacity} from "react-native-pressable-opacity";

interface BottleSummaryProps {
    bottle: BottleType,
    navigation: any
}

export const BottleSummary = ({bottle, navigation}: BottleSummaryProps) => {

    const {colors} = useTheme();
    const icon = (props: { size: number }) => <Icon source={"bottle-wine"} size={20}/>

    const deleteBottleFromDB = async () => {
        const db = await getDBConnection();
        await deleteBottle(db, bottle.id!);
    };

    let colorString;
    switch (bottle.color) {
        case 'red':
            colorString = "Vin Rouge";
            break;
        case 'white':
            colorString = "Vin Rouge";
            break;
        case 'pink':
            colorString = "Vin Rouge";
            break;
        default:
            colorString = `Vin ${bottle.color}`;
    }

    return (
        <Card
            style= {{
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
                <Button mode={"text"} onPress={deleteBottleFromDB}>Sortir la bouteille</Button>
            </Card.Actions>

        </Card>
    )
}