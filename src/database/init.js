const database = require('./config')

const initDb = { //roda apenas no inicio para criar o banco
    async init(){
        const db = await database()

        await db.exec(`
            CREATE TABLE rooms(
                id INTEGER PRIMARY KEY,
                pass TEXT
            )
        `)

        await db.exec(`
            CREATE TABLE questions(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content_question TEXT,
                read INT,
                room INT
            )
        `)

        await db.close()
    }
}

initDb.init()