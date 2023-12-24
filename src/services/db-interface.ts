import {enablePromise, openDatabase, ResultSet, SQLiteDatabase} from "react-native-sqlite-storage";
import {BottleType} from "../models/Bottle.tsx";

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({name: 'test.db', location: 'default'});
};

export const initDB = async (db: SQLiteDatabase) => {
    // create table if not exists
    await initTable(db, "Bottles", "name TEXT NOT NULL, vintageYear INTEGER NOT NULL, color TEXT NOT NULL");
};

export const initTable = async (db: SQLiteDatabase, tableName: string, schema: string) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${schema});`;

    await db.executeSql(query);
};

export const getBottles = async (db:SQLiteDatabase): Promise<BottleType[]> => {
    const query = "SELECT * FROM Bottles";

    try {
        const bottles: BottleType[] = [];
        const lines = await db.executeSql(query);
        lines.forEach(l => {
            for (let index = 0; index < l.rows.length; index++) {
                bottles.push(l.rows.item(index));
            }
        });

        return bottles;
    } catch (e) {
        console.error(e);
        throw Error(`Failed to fetch Bottles`);
    }
};

export const insertBottles = async (db: SQLiteDatabase, bottles: BottleType[]): Promise<[ResultSet]> => {
    const query = `INSERT OR REPLACE INTO Bottles(name, vintageYear, color) VALUES` +
        bottles.map(b => `('${b.name}', '${b.vintageYear}', '${b.color}')`).join(',');

    return db.executeSql(query);
}

export const deleteBottle = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from Bottles where id = ${id}`;
    await db.executeSql(deleteQuery);
};