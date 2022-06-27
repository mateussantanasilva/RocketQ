const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

module.exports = () => 
    open({ //se precisar, sempre importa este arquivo pois ele abre o db
        filename: './src/database/rocketq.sqlite',
        driver: sqlite3.Database
    })
