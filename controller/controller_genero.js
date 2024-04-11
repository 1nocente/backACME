/*************************************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistencias de dados dos filmes
 * DATA: 01/02/2024
 * Autor: Pedro Henrique Inocente
 * Versão: 1.0
 */

//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const generosDAO = require('../model/DAO/generos.js')

const getListarGeneros = async function () {

    //Cria um objeto JSON
    let generosJSON= {}

    //Chama a função do DAO que retorna filmes do BD
    let dadosGeneros = await generosDAO.selectAllGeneros()

    //Validação para verificar se o DAO retornou dados
    if (dadosGeneros) {
        //cria o JSON para retorna para o app
        generosJSON.filmes = dadosGeneros
        generosJSON.quantidade = dadosGeneros.length
        generosJSON.status_code = 200

        return generosJSON
    }
    else {
        return false
    }
}




module.exports = {
    getListarGeneros
}