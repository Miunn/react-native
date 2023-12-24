import {Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Button, Card, Icon} from "react-native-paper";
import {deleteBottle, getDBConnection} from "../services/db-interface.ts";
import {BottleType} from "../models/Bottle.tsx";

interface BottleSummaryProps {
    bottle: BottleType,
}

export const BottleSummary = ({bottle: {id, name, vintageYear, color}}: BottleSummaryProps) => {

    const { colors } = useTheme();
    const icon = (props: {size: number}) => <Icon source={"bottle-wine"} size={20} />

    const deleteBottleFromDB = async () => {
        const db = await getDBConnection();
        await deleteBottle(db, id!);
    };

    return (
        <Card style={{
            margin: 10
        }}>
            <Card.Title title={name} subtitle={vintageYear} left={icon} />
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

    {/*<View style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
            backgroundColor: colors.card,
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10
        }}>
            <Text style={{
                color: colors.text,
            }}>Bottle {color}</Text>
            <View>
                <Text style={{
                    color: colors.text,
                    fontSize: 18
                }}>{name}</Text>
                <Text style={{
                    color: colors.text,
                    fontSize: 12,
                }}>{vintageYear}</Text>
            </View>
        </View> */}
}