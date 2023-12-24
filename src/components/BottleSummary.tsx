import {Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Button, Card, Icon, TouchableRipple} from "react-native-paper";
import {deleteBottle, getDBConnection} from "../services/db-interface.ts";
import {BottleType} from "../models/BottleType.tsx";

interface BottleSummaryProps {
    bottle: BottleType,
}

export const BottleSummary = ({bottle: {id, name, vintageYear, color}}: BottleSummaryProps) => {

    const {colors} = useTheme();
    const icon = (props: { size: number }) => <Icon source={"bottle-wine"} size={20}/>

    const deleteBottleFromDB = async () => {
        const db = await getDBConnection();
        await deleteBottle(db, id!);
    };

    let colorString;
    switch (color) {
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
            colorString = `Vin ${color}`;
    }

    return (
        <Card style={{
            margin: 10
        }}>
            <Card.Title title={name} subtitle={`${vintageYear} - ${colorString}`} left={icon}/>
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