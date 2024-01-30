import {enablePromise, openDatabase, ResultSet, SQLiteDatabase} from "react-native-sqlite-storage";
import {BottleType} from "../models/BottleType.tsx";
import {it} from "@jest/globals";

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({name: 'test.db', location: 'default'});
};

export const initDB = async (db: SQLiteDatabase) => {
    // create table if not exists
    await initTable(db, "Bottles", "name TEXT NOT NULL, signature TEXT, vintageYear INTEGER NOT NULL, color TEXT NOT NULL, imageUri TEXT");
};

export const initTable = async (db: SQLiteDatabase, tableName: string, schema: string) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${schema});`;

    await db.executeSql(query);
};

export const dropTable = async (db: SQLiteDatabase, tableName: string) => {
    const query = `DROP TABLE IF EXISTS ${tableName};`;

    await db.executeSql(query);
}

export const getBottles = async (db:SQLiteDatabase): Promise<BottleType[]> => {
    const query = "SELECT rowid, * FROM Bottles";

    try {
        const bottles: BottleType[] = [];
        const lines = await db.executeSql(query);
        lines.forEach(l => {
            for (let index = 0; index < l.rows.length; index++) {
                const item = l.rows.item(index);

                bottles.push({
                    id: item.rowid,
                    name: item.name,
                    signature: item.signature,
                    vintageYear: item.vintageYear,
                    color: item.color,
                    imageUri: item.imageUri
                });
            }
        });

        console.log(bottles);
        return bottles;
    } catch (e) {
        console.error(e);
        throw Error(`Failed to fetch Bottles`);
    }
};

export const insertBottles = (db: SQLiteDatabase, bottles: BottleType[]): Promise<[ResultSet]> => {
    const query = `INSERT OR REPLACE INTO Bottles(name, signature, vintageYear, color, imageUri) VALUES` +
        bottles.map(b => `('${b.name}', '${b.signature}', '${b.vintageYear}', '${b.color}', '${b.imageUri}')`).join(',');

    return db.executeSql(query);
}

export const updateBottle = (db: SQLiteDatabase, bottle: BottleType): Promise<[ResultSet]> => {
    const query = `UPDATE Bottles SET name='${bottle.name}', signature='${bottle.signature}', vintageYear=${bottle.vintageYear}, color='${bottle.color}', imageUri='${bottle.imageUri}' WHERE rowid=${bottle.id};`;

    console.log(`update bottle ${JSON.stringify(bottle)}`);

    return db.executeSql(query);
}

export const deleteBottle = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from Bottles where rowid = ${id}`;
    return db.executeSql(deleteQuery);
};