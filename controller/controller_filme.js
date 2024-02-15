/*************************************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistencias de dados dos filmes
 * DATA: 01/02/2024
 * Autor: Pedro Henrique Inocente
 * Versão: 1.0
 */

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
const getBuscarFilmes = async function () {

}

const getNomeFilme = async function (nomeFilme) {

        //Cria um objeto JSON
   let filmesJSON = {}

   //Chama a função do DAO que retorna filmes do BD
   let dadosFilmes = await FilmesDAO.selectByNomeFilmes(nomeFilme)

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
module.exports = {
    getNomeFilme,
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilmes,
    getListarFilmes
}