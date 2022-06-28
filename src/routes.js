const express = require('express')
const route = express.Router() //middleware

const roomController = require('./controllers/room-controller') 
const questionController = require ('./controllers/question-controller')

route.get('/', (req, res) => res.render('index', {page: 'login-room'}))
route.get('/criar-senha', (req, res) => res.render('index', {page: 'create-pass'}))

route.post('/criar-sala', roomController.create) //Não colocar path post igual ao do get
route.post('/entrar-sala', roomController.login)
route.get('/sala/:room', roomController.open) //recebe do controller com var da room

route.post('/sala/:room/:action/:question', questionController.action)
route.post('/criar-pergunta/:room', questionController.create)

module.exports = route