/*************************************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistencias de dados dos filmes
 * DATA: 01/02/2024
 * Autor: Pedro Henrique Inocente
 * Versão: 1.0
 */

//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const FilmesDAO = require('../model/DAO/filme.js')

//Função para inserir um novo filme
const setInserirNovoFilme = async function () {

}


//Função para atualizar um filme
const setAtualizarFilme = async function () {

}


//Função para excluir um filme
const setExcluirFilme = async function () {

}

//Função para listar todos os filmes
const getListarFilmes = async function () {

    //Cria um objeto JSON
   let filmesJSON = {}

   //Chama a função do DAO que retorna filmes do BD
   let dadosFilmes = await FilmesDAO.selectAllFilmes()

   //Validação para verificar se o DAO retornou dados
   if (dadosFilmes){
    //cria o JSON para retorna para o app
    filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.lenght
            filmesJSON.status_code = 200

                return filmesJSON 
   }
   else{
    return false
   }
}
 
//Função para buscar os filmes
const getBuscarFilme = async function (id) {

    

    // recebe o id do filme
    let idFilme = id

    //cria o objeto json
    let filmeJSON = {}

    //Validação para verificar de Id é valido (vazio, indefinido e não numerico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID //400
    }else{
        
        let dadosFilme = await FilmesDAO.selectByIdFilmes(idFilme)

        //verificação para ver se existem dados de retorno
        if (dadosFilme){

            //Validação para verificar a quantidade de itens encontrados
            if (dadosFilme.length > 0){
            //cria o JSON de retorno
            filmeJSON.filme = dadosFilme
            filmeJSON.status_code = 200

            return filmeJSON

            }else{
                return message.ERROR_NOT_FOUND //404
            }
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
    }

}

const getNomeFilme = async function (nomeFilme) {

    let nome = nomeFilme

        //Cria um objeto JSON
   let filmeJSON = {}


   if(nome == '' || nome == undefined){
    return message.ERROR_INVALID_ID //400
   }else{

    let nomeDoFilme = await FilmesDAO.selectByNomeFilmes(nome)

    if (nomeDoFilme){

        if (nomeDoFilme.length > 0){

        filmeJSON.filme = nomeDoFilme
        filmeJSON.status_code = 200

        return filmeJSON
    }else{
        return message.ERROR_NOT_FOUND //404
    }  
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }
   }

//    //Chama a função do DAO que retorna filmes do BD
//    let dadosFilmes = await FilmesDAO.selectByNomeFilmes(nomeFilme)

//    //Validação para verificar se o DAO retornou dados
//    if (dadosFilmes){
//     //cria o JSON para retorna para o app
//     filmesJSON.filmes = dadosFilmes
//         filmesJSON.quantidade = dadosFilmes.lenght
//             filmesJSON.status_code = 200

//                 return filmesJSON 
//    }
//    else{
//     return {status_code: 400, message: ''}
//    }

}
module.exports = {
    getNomeFilme,
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarFilmes
}