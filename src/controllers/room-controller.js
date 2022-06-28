const database = require('../database/config')

module.exports = {
    async create(req, res){
        const db = await database()
        const pass = req.body.password //pega o name do form
        let roomId
        let roomAlreadyExists = true

        if(pass.length > 5){

            while(roomAlreadyExists){ 
                for (let i = 0; i < 6; i++) {        
                    i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString() //+= atribui a soma do atual valor da var com o valor passado  
                }

                const roomsExisting =  await db.all(`SELECT id FROM rooms`)
                roomAlreadyExists = roomsExisting.some(roomExisting => roomExisting === roomId) //some verifica se existe algum igual

                if (!roomAlreadyExists){
                    await db.run(`INSERT INTO rooms(id, pass) VALUES(${parseInt(roomId)}, "${pass}")`) //parseInt converte em int

                    await db.close()
            
                    res.redirect(`/sala/${roomId}`) //envia ao get
                } 
            }
            
        }else{
            let typeErrForm = 'senha fraca'
            res.render(`errs`, {errorForm: typeErrForm, room:roomId})
        }
    },
    
    async open(req, res){ //ao entrar na sala que existe ou foi criada
        const db = await database()
        const roomId = req.params.room

        //pego todas as question do bd
        const questionsNoRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)
        let isNotHaveQuestions
        await db.close()

        if ((questionsNoRead.length == 0) && (questionsRead.length == 0)){
            isNotHaveQuestions = true
        }

        res.render( //passo obj pois usarei no ejs
            'room', {
                room: roomId, 
                questionsNoRead: questionsNoRead, 
                questionsRead: questionsRead,
                isNotHaveQuestions: isNotHaveQuestions
            }
        ) 
    },

    async login(req, res){
        const db = await database()
        const roomId = parseInt(req.body.code)
        
        const roomsExisting =  await db.all(`SELECT id FROM rooms`)
        let roomAlreadyExists = roomsExisting.some(roomExisting => roomExisting.id == parseInt(roomId))
        
        await db.close()

        if(roomAlreadyExists){
            res.redirect(`/sala/${roomId}`)
        }else{
            let typeErrForm = 'sala inexistente'
            res.render(`errs`, {errorForm: typeErrForm, room:roomId})
        }
    }
}