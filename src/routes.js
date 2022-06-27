const express = require('express')
const route = express.Router() //middleware

const roomController = require('./controllers/room-controller') 

route.get('/', (req, res) => res.render('index', {page: 'login-room'}))
route.get('/criar-senha', (req, res) => res.render('index', {page: 'create-pass'}))
route.get('/sala/:room', (req, res) => res.render('room')) //recebe do controller

route.post('/criar-sala', roomController.create) //Não colocar path post igual ao do get

module.exports = route