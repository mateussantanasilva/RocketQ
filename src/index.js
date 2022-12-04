const express = require('express')
const path = require ('path')
const http = require('http')
const routes = require('./routes')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public')) //indica pasta com os assets
app.set('views', path.join(__dirname, 'views')) //indica o path da patas views

app.use(express.urlencoded({extended: true})) //permite passar dados codificados

app.use(routes)

app.set('port', process.env.PORT || 3000)

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Servidor rodando na porta ${app.get('port')}`)
})