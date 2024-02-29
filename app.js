/**********************************************************************************************************************************
 * Objetivo: arquivopara realizar aquizição de filmes
 * Data: 08/02/23
 * Autor: Pedro Inocente
 * Versão: 1.1
 * 
 * 
 **********************************************************************************************************************************/


/***
 * Para realizar integração com o banco de dados devemos utilizar uma das seguintes bibliotecas:
 *       -SEQUELIZE    ´É a biblioteca mais antiga
 * 
 *       -FASTFY ORM -  É a biblioteca mais atual 
 * 
 *      -PRISMA ORM    -É a biblioteca mais atual  (Utilizaremos no projeto)
 * 
 *      -Para a instalação do PRISMA ORM:
 *       npm install prisma --save            (É responsavel pela conexão com o BD)
 * 
 *       npm install @prisma/client --save     (É responsavel por executar scripts SQL no BD)
 * 
 *       npx prisma init (Inicializa o prisma no projeto)
 * 
 *      
 */






const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const filmes_funcoes = require('./controller/function.js')

const app = express()

app.use(express.json())
app.use((request, response , next) =>{

    response.header('Access-Control-Allow-origin', '*')
    response.header('Acesss-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    app.use(cors())

    next()
})


//Endpoints:

/***************************Import dos arquivos de Controller do projeto***************************************************/
    const controllerFilmes = require('./controller/controller_filme.js')


    
 /*************************************************************************************************************************/

//Criando um objeto para controlar a chegada dos dados na requisição em formato JSOn
 const bodyParserJSON = bodyParser.json()

//endpoint: versao 1.0 - retorna os dados de filme do Banco de dados

//periodo de utilização 01/2024 a 02/2024
app.get('/v1/AcmeFilmes/filmes', cors(), async function(request, response, next){

    let listaDeFilmes = filmes_funcoes.getFilmes()

    if(listaDeFilmes){
        response.json(listaDeFilmes)
        response.status(200)
    }else{
        response.json({erro:'itens não encontrados'})
        response.status(404)
    }

    next()

    //endpoint: versao 2.0 - retorna os dados de filme do Banco de daos
})

app.get('/v2/acmeFilmes/filmes', cors(), async function(request, response){


    //Chama a afunção da controller para retornar os todos os filmes
    let dadosFilmes = await controllerFilmes.getListarFilmes()


    //Validação para verifica se existem dados a serem retornados
    if(dadosFilmes){
        response.json(dadosFilmes)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

} 
)

app.get('/v2/AcmeFilmes/filmes/filtro', cors(), async function(request, response) {

     //recebe o nome da requisição
    let nomeFilme = request.query.nome

    //encaminha o nome para a cotroller buscar o filme
    let filmeNome = await controllerFilmes.getNomeFilme(nomeFilme)

    response.status(filmeNome.status_code)
        response.json(filmeNome)
        

    })

app.get('/v1/AcmeFilmes/filme/:id', cors(), async function( request, response, next) {

    let idFilme = request.params.id
    let filmeListado = filmes_funcoes.getFilmesId(idFilme)

    if(filmeListado){
        response.json(filmeListado)
        response.status(200)
    }else{
        response.json({erro:'itens não encntrados'})
        response.status(404)
    }

    next()
})

app.get('/v2/AcmeFilmes/filme/:id', cors(), async function( request, response) {

    //recebe o id da requisição
    let idFilme = request.params.id

    //encaminha o id para a cotroller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.post('/v2/AcmeFilmes/filme', cors(), bodyParserJSON, async function(request, response){
    //Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //Encaminha os dados para o controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})


app.listen('8080', () =>{
    console.log('RODANDO NA PORTA 8080')
})
