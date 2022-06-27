const database = require('../database/config')

module.exports = {
    async create(req, res){
        const db = await database()
        const pass = req.body.password //pega o name do form
        let roomId

        for (let i = 0; i < 6; i++) {        
            i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString() //+= atribui a soma do atual valor da var com o valor passado  
        }
        
        await db.run(`INSERT INTO rooms(id, pass) VALUES(${parseInt(roomId)}, ${pass})`) //parseInt converte em int

        await db.close()

        res.redirect(`/sala/${roomId}`) //envia ao get
}}