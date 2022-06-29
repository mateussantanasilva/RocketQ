const express = require('express')
const path = require ('path')
const routes = require('./routes')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public')) //indica pasta com os assets
app.set('views', path.join(__dirname, 'views')) //indica o path da patas views

app.use(express.urlencoded({extended: true})) //permite passar dados codificados

app.use(routes)

app.listen(3000, () => console.log('Rodando...'))