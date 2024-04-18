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
const filmes_funcoes = require('../controller/function.js')
const port = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use((request, response, next) => {

    response.header('Access-Control-Allow-origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    app.use(cors())

    next()
})


//Endpoints:

/***************************Import dos arquivos de Controller do projeto***************************************************/
const controllerFilmes = require('../controller/controller_filme.js')
const controllerGeneros = require('../controller/controller_genero.js')
const controllerClassificacao = require('../controller/controller_classificacao.js')
const controllerSexo = require('../controller/controller_sexo.js')
const controllerNacionalidade = require('../controller/controller_nacionalidade.js')
const controllerAtores = require('../controller/controller_ator.js')


/*************************************************************************************************************************/

//Criando um objeto para controlar a chegada dos dados na requisição em formato JSOn
const bodyParserJSON = bodyParser.json()

//endpoint: versao 1.0 - retorna os dados de filme do Banco de dados

//periodo de utilização 01/2024 a 02/2024
app.get('/v1/AcmeFilmes/filmes', cors(), async function (request, response, next) {

    let listaDeFilmes = filmes_funcoes.getFilmes()

    if (listaDeFilmes) {
        response.json(listaDeFilmes)
        response.status(200)
    } else {
        response.json({ erro: 'itens não encontrados' })
        response.status(404)
    }

    next()

    //endpoint: versao 2.0 - retorna os dados de filme do Banco de daos
})

app.get('/v2/acmeFilmes/filmes', cors(), async function (request, response) {


    //Chama a afunção da controller para retornar os todos os filmes
    let dadosFilmes = await controllerFilmes.getListarFilmes()


    //Validação para verifica se existem dados a serem retornados
    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum registro encontrado' })
        response.status(404)
    }

}
)

app.get('/v2/AcmeFilmes/filmes/filtro', cors(), async function (request, response) {

    //recebe o nome da requisição
    let nomeFilme = request.query.nome

    //encaminha o nome para a cotroller buscar o filme
    let filmeNome = await controllerFilmes.getNomeFilme(nomeFilme)

    response.status(filmeNome.status_code)
    response.json(filmeNome)


})

app.get('/v1/AcmeFilmes/filme/:id', cors(), async function (request, response, next) {

    let idFilme = request.params.id
    let filmeListado = filmes_funcoes.getFilmesId(idFilme)

    if (filmeListado) {
        response.json(filmeListado)
        response.status(200)
    } else {
        response.json({ erro: 'itens não encntrados' })
        response.status(404)
    }

    next()
})

app.get('/v2/AcmeFilmes/filme/:id', cors(), async function (request, response) {

    //recebe o id da requisição
    let idFilme = request.params.id

    //encaminha o id para a cotroller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.post('/v2/AcmeFilmes/filme', cors(), bodyParserJSON, async function (request, response) {


    //recebe o content-type da requisição
    let contentType = request.header('content-type')




    //Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //Encaminha os dados para o controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)


    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

// Endpoint para excluir um filme
app.delete('/v2/acmefilmes/filme/:id', cors(), async function (request, response) {
    // Recebe o ID do filme a ser excluído da requisição
    let idFilme = request.params.id;

    // Encaminha o ID para a função do controlador que exclui o filme
    let resultadoExclusao = await controllerFilmes.setExcluirFilme(idFilme);

    // Define a resposta com base no resultado da exclusão
    response.status(resultadoExclusao.status_code).json(resultadoExclusao);
});

app.put('/v2/acmefilmes/filme/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.header('content-type')

    // Recebe o ID do filme da requisição
    let idFilme = request.params.id;

    // Recebe os dados do corpo da requisição
    let dadosFilme = request.body;

    // Chama a função do controller para atualizar o filme
    let resultadoAtualizacao = await controllerFilmes.setAtualizarFilme(idFilme, contentType, dadosFilme);

    // Retorna a resposta ao cliente
    response.status(resultadoAtualizacao.status_code).json(resultadoAtualizacao);

    let DadosFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosFilme, contentType)
    response.status(DadosFilme.status_code)
    response.json(DadosFilme)
});

// -------------------------------------GENEROS--------------------------------------------------------//

app.get('/v2/acmeFilmes/generos', cors(), async function (request, response) {


    //Chama a afunção da controller para retornar os todos os filmes
    let dadosGeneros = await controllerGeneros.getListarGeneros()


    //Validação para verifica se existem dados a serem retornados
    if (dadosGeneros) {
        response.json(dadosGeneros)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum registro encontrado' })
        response.status(404)
    }

})

app.post('/v2/AcmeFilmes/genero', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']


    let dadosBody = request.body

    let resultDadosNovoGenero = await controllerGeneros.setInserirNovoGenero(dadosBody, contentType)
    
    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

// Endpoint para excluir um filme
app.delete('/v2/acmefilmes/genero/:id', cors(), async function (request, response) {
    // Recebe o ID do filme a ser excluído da requisição
    let idGenero = request.params.id;

    // Encaminha o ID para a função do controlador que exclui o filme
    let resultadoExclusao = await controllerGeneros.setExcluirGenero(idGenero);

    // Define a resposta com base no resultado da exclusão
    response.status(resultadoExclusao.status_code).json(resultadoExclusao);
});

app.put('/v2/acmefilmes/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o ID do filme da requisição
    let idGenero = request.params.id;

    // Recebe os dados do corpo da requisição
    let dadosGenero = request.body;

    // Chama a função do controller para atualizar o filme
    let resultadoAtualizacao = await controllerGeneros.setAtualizarGenero(idGenero, dadosGenero);

    // Retorna a resposta ao cliente
    response.status(resultadoAtualizacao.status_code).json(resultadoAtualizacao);
});


// -------------------------------------CLASSIFICACOES--------------------------------------------------------//

// Endpoint para listar todas as classificações
app.get('/v2/acmeFilmes/classificacoes', cors(), async function (request, response) {
    // Chama a função da controller para retornar todas as classificações
    let dadosClassificacoes = await controllerClassificacao.getListarClassificacoes();

    // Validação para verificar se existem dados a serem retornados
    if (dadosClassificacoes) {
        response.status(200).json(dadosClassificacoes);
    } else {
        response.status(404).json({ message: 'Nenhuma classificação encontrada' });
    }
});

// Endpoint para inserir uma nova classificação
app.post('/v2/acmeFilmes/classificacao', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovaClassificacao = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType);

    response.status(resultDadosNovaClassificacao.status_code).json(resultDadosNovaClassificacao);
});

// Endpoint para excluir uma classificação
app.delete('/v2/acmefilmes/classificacao/:id', cors(), async function (request, response) {
    // Recebe o ID da classificação a ser excluída da requisição
    let idClassificacao = request.params.id;

    // Encaminha o ID para a função do controlador que exclui a classificação
    let resultadoExclusao = await controllerClassificacao.setExcluirClassificacao(idClassificacao);

    // Define a resposta com base no resultado da exclusão
    response.status(resultadoExclusao.status_code).json(resultadoExclusao);
});

// Endpoint para atualizar uma classificação
app.put('/v2/acmefilmes/classificacao/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o ID da classificação da requisição
    let idClassificacao = request.params.id;

    // Recebe os dados do corpo da requisição
    let dadosClassificacao = request.body;

    // Chama a função do controller para atualizar a classificação
    let resultadoAtualizacao = await controllerClassificacao.setAtualizarClassificacao(idClassificacao, dadosClassificacao);

    // Retorna a resposta ao cliente
    response.status(resultadoAtualizacao.status_code).json(resultadoAtualizacao);
});

// -------------------------------------SEXOOO--------------------------------------------------------//

// Endpoint para listar todas as classificações
app.get('/v2/acmeFilmes/sexo', cors(), async function (request, response) {
    // Chama a função da controller para retornar todas as classificações
    let dadosSexo = await controllerSexo.getListarSexo();

    // Validação para verificar se existem dados a serem retornados
    if (dadosSexo) {
        response.status(200).json(dadosSexo);
    } else {
        response.status(404).json({ message: 'Nenhuma classificação encontrada' });
    }
});


app.get('/v2/AcmeFilmes/ator/sexo/filtro', cors(), async function (request, response) {
    // Recebe o nome do ator da requisição
    let nomeAtor = request.query.nome;

    // Encaminha o nome para o controller buscar o sexo do ator
    let resultado = await controllerSexo.getSexoNomeAtor(nomeAtor);

    // Define o status e envia a resposta
    response.status(resultado.status_code).json(resultado);
});

// Endpoint para buscar o sexo do ator pelo ID
app.get('/v2/AcmeFilmes/ator/:id/sexo', cors(), async function (request, response) {
    // Recebe o ID do ator da requisição
    let idAtor = request.params.id;

    // Encaminha o ID para o controller buscar o sexo do ator
    let resultado = await controllerSexo.getSexoIdAtor(idAtor);

    // Define o status e envia a resposta
    response.status(resultado.status_code).json(resultado);
});

// -------------------------------------NACIONALIDADE--------------------------------------------------------//

// Endpoint para listar todas as classificações
app.get('/v2/acmeFilmes/nacionalidades', cors(), async function (request, response) {
    // Chama a função da controller para retornar todas as classificações
    let dadosNacionalidade = await controllerNacionalidade.getListarNacionalidade();

    // Validação para verificar se existem dados a serem retornados
    if (dadosNacionalidade) {
        response.status(200).json(dadosNacionalidade);
    } else {
        response.status(404).json({ message: 'Nenhuma classificação encontrada' });
    }
});

app.get('/v2/AcmeFilmes/ator/nacionalidade/filtro', cors(), async function (request, response) {
    // Recebe o nome do ator da requisição
    let nomeAtor = request.query.nome;

    // Encaminha o nome para o controller buscar a nacionalidade do ator
    let resultado = await controllerNacionalidade.getNacionalidadeNomeAtor(nomeAtor);

    // Define o status e envia a resposta
    response.status(resultado.status_code).json(resultado);
});

// Endpoint para buscar a nacionalidade do ator pelo ID
app.get('/v2/AcmeFilmes/ator/:id/nacionalidade', cors(), async function (request, response) {
    // Recebe o ID do ator da requisição
    let idAtor = request.params.id;

    // Encaminha o ID para o controller buscar a nacionalidade do ator
    let resultado = await controllerNacionalidade.getNacionalidadeIdAtor(idAtor);

    // Define o status e envia a resposta
    response.status(resultado.status_code).json(resultado);
});

app.listen(port, () => {
    console.log('RODANDO NA PORTA ' + port)
})

// -------------------------------------ATORES--------------------------------------------------------//

// Endpoint para listar todas os atores
app.get('/v2/acmeFilmes/atores', cors(), async function (request, response) {
    // Chama a função da controller para retornar todas as classificações
    let dadosAtores = await controllerAtores.getListarAtores();

    // Validação para verificar se existem dados a serem retornados
    if (dadosAtores) {
        response.status(200).json(dadosAtores);
    } else {
        response.status(404).json({ message: 'Nenhuma classificação encontrada' });
    }
});