
import {SQLite, SQLiteObject, SQLiteTransaction} from "@awesome-cordova-plugins/sqlite";

export const createDB = () => {

};

export const initDb = (): void => {
        console.log('initDB fired!');
        try {
            SQLite.create({
                name: 'data.db', location: 'default'
            }).then(
                async (db: SQLiteObject) => {
                try {
                    const create = await db.executeSql(
                        'create table if not exists ' +
                        'todos(title VARCHAR(50), ' +
                        'description VARCHAR(50), ' +
                        'done INT, date VARCHAR(30), date VARCHAR(20)',
                        []);
                    await console.log('Table created/exists. Msg: ', create);

                    const insert = await db.executeSql(
                        'insert into todos (title, description, done, date) ' +
                        'values (?)',
                        ['Macarena']);
                    await console.log('Inserted Macarena: ', insert);

                } catch (e) {
                    console.log('SQL error: ', e);
                }
            })
        } catch(e) {
           // setShowAlert(true);
            console.log('please use a device: ', e)
        }

    };

export const insertIntoDB = (title: string, description: string, done: boolean, date: string) => {

    try {
        SQLite.create({
            name: 'data.db', location: 'default'
        }).then(
            async (db: SQLiteObject) => {
                try {
                    const create = await db.executeSql(
                        'create table if not exists ' +
                        'todos(title VARCHAR(50), ' +
                        'description VARCHAR(50), ' +
                        'done INT, date VARCHAR(30))',
                        []);
                    await console.log('Table created/exists. Msg: ', create);

                    const insert = await db.executeSql('insert into todos (name) values (?)', ['Macarena']);
                    await console.log('Inserted Macarena: ', insert);

                } catch (e) {
                    console.log('SQL error: ', e);
                }
            })
    } catch(e) {
        // setShowAlert(true);
        console.log('please use a device: ', e)
    }
}
