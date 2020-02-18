
const express = require('express')


const app = express()

//CONFIGURAR SERVIDOR PRA APRESENTAR ARQUIVOS EXTRAS
app.use(express.static('../frontend/public'))

//CONFIGURAÇÃO DA TMEPALTE ENGINE
const nunjucks = require('nunjucks')
nunjucks.configure("../frontend", {
    express: app,
    noCache: true,
})

const donors = [
        {
            name: "Ramon Tavares",
            blood: "O+"

        }
]


//RENDERIZANDO A PÁGINA
app.get('/', function(req,res) {

    return res.render('index.html', {donors})    
})



app.listen(3333, () => {
    console.log('Servidor iniciado')
})
