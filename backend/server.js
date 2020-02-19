
const express = require('express')


const app = express()

//CONFIGURAR SERVIDOR PRA APRESENTAR ARQUIVOS EXTRAS
app.use(express.static('../frontend/public'))
//HABILITAR BODY DO FORMULARIO
app.use(express.urlencoded({extended: true}))

//CONFIGURAR O BANCO
const Pool = require('pg').Pool
const db = new Pool({
    user: "postgres",
    password: "r@12589mon",
    host: "localhost",
    port: 5432,
    database: 'doe'
})

//CONFIGURAÇÃO DA TMEPALTE ENGINE
const nunjucks = require('nunjucks')
nunjucks.configure("../frontend", {
    express: app,
    noCache: true,
})


//RENDERIZANDO A PÁGINA
app.get('/', function(req,res) {
    db.query('SELECT * FROM donors', function(err, result){
        if (err) return res.send("Erro ao buscar dados.")

        const donors  = result.rows
        return res.render('index.html', {donors})
    })

        
})

app.post('/', function(req,res) {
    //PEGAR DADOS DO FORMULARIO
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood


    if(name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatorios")
    }
    //CLOCANDO VALORES NO BANCO

    const query = `
    INSERT INTO donors ("name", "email", "blood") 
    VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err) {
        if (err) return res.send("Erro no banco de dados")

        return res.redirect('/')

    })
  

   

});



app.listen(3333, () => {
    console.log('Servidor iniciado')
})
