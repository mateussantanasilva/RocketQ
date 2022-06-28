const database = require('../database/config')

module.exports = {
    async create(req, res){
        const db = await database()
        const contentQuestion = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions(content_question, read, room) VALUES("${contentQuestion}", 0, ${roomId})`)

        await db.close()

        res.redirect(`/sala/${roomId}`)
    },

    async action(req, res){
        const db = await database()
        const roomId = req.params.room
        const typeAction = req.params.action
        const questionId = req.params.question
        const password = req.body.password

        const passRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if(passRoom.pass == password){
            if(typeAction == 'read'){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId} and room = ${roomId}`)
            }else if(typeAction == 'delete'){
                await db.run(`DELETE FROM questions WHERE id = ${questionId} and room = ${roomId}`)
            }
            await db.close()
            res.redirect(`/sala/${roomId}`)
        } else{
            res.render('senha-incorreta', {room:roomId})
        }

    }
}