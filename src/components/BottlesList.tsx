import {useIsFocused, useTheme} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import {BottleType} from "../models/BottleType.tsx";
import {getBottles, getDBConnection, initDB} from "../services/db-interface.ts";
import {ScrollView} from "react-native";
import {List} from "react-native-paper";

const BottlesList = ({navigation}: any) => {
    const isFocused = useIsFocused();
    const {colors} = useTheme();

    const [bottles, setBottles] = useState<BottleType[]>([]);
    const loadBottlesCallback = async () => {
        try {
            const db = await getDBConnection();
            await initDB(db);
            const storedBottles = await getBottles(db);
            setBottles(storedBottles);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isFocused) {
            loadBottlesCallback();
        }
    }, [isFocused]);

    return (
        <ScrollView>
            {bottles.map((bottle) => {
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
                    <List.Item
                        key={bottle.id}
                        title={bottle.name}
                        description={`${bottle.vintageYear} - ${colorString}`}
                        left={props => <List.Icon {...props} icon={"bottle-wine"} /> }
                        onPress={() => navigation.navigate('bottle', {bottle: bottle})}
                    />
                )
            })}
        </ScrollView>
    )
}

export default BottlesList;