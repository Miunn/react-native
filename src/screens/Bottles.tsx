import {ScrollView, Text} from "react-native";
import {useIsFocused, useTheme} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import {BottleType} from "../models/BottleType.tsx";
import {getBottles, getDBConnection, initDB} from "../services/db-interface.ts";
import { List } from 'react-native-paper';

const Bottles = () => {

    const isFocused = useIsFocused();
    const {colors} = useTheme();

    const [bottles, setBottles] = useState<BottleType[]>([]);
    const loadBottlesCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await initDB(db);
            const storedBottles = await getBottles(db);
            setBottles(storedBottles);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        loadBottlesCallback();
    }, [loadBottlesCallback, isFocused, bottles]);

    return (
        <ScrollView>
            <Text>Toutes les bouteilles</Text>
            {bottles.map((bottle) => {
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
                    <List.Item
                        key={bottle.id}
                        title={bottle.name}
                        description={`${bottle.vintageYear} - ${colorString}`}
                        left={props => <List.Icon {...props} icon={"bottle-wine"} /> }
                    />
                )
            })}
        </ScrollView>
    )
}

export default Bottles;