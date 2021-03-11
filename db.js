const mysql = require('mysql')

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'easy_work'
})

connection.connect((err) => {
    if(err){
        console.log('Houve um erro na conexão com o DB: ' + err)
        return
    }
    console.log("Conexão realizada com sucesso")
})

module.exports = connection