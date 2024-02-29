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
const setInserirNovoFilme = async function (dadosFilme) {

    //Cria o objeto JSON 
    let novoFilmeJSON = {}

    //Validação de campos obrigatorios ou com digitação invalida
    if(dadosFilme.nome == ''         || dadosFilme.nome == undefined            || dadosFilme.nome.length > 80                     || 
    dadosFilme.sinopse == ''         || dadosFilme.sinopse == undefined         || dadosFilme.sinopse.length > 65000               || 
    dadosFilme.duracao == ''         || dadosFilme.duracao == undefined         || dadosFilme.duracao.length > 8                   || 
    dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length!= 10 || 
    dadosFilme.data_relancamento.length != 10                                   ||
    dadosFilme.foto_capa == ''       || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa > 200              ||
    dadosFilme.valor_unitario.length> 6
     ){
        return message.ERROR_REQUIRED_FIELDS
     }else{

        let validateStatus = false  
        if(dadosFilme.data_relancamento != null || dadosFilme.data_relancamento != '' ){
            if(dadosFilme.data_relancamento.length != 10){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{ 
                validateStatus = true
            }
                 }else{
                        validateStatus = true
        }
        // Encaminha os dados do filme para o DAO inserir no BD
        let novoFilme = await FilmesDAO.insertFilme(dadosFilme)


        //Validação para verificar se o DAO inseriu os dados no banco
        if(novoFilme){
        //Cria o JSON de retorno dos dados (201)
            novoFilmeJSON.filme       = dadosFilme
            novoFilmeJSON.status      = message.SUCCESS_CREATED_ITEM.status
            novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            novoFilmeJSON.message     = message.SUCCESS_CREATED_ITEM.message

            return novoFilmeJSON // 201
     }else{
        return message.ERROR_INTERNAL_SERVER_DB // 
     } 
    }



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
        filmesJSON.quantidade = dadosFilmes.length
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
    return message.ERROR_INVALID_NAME //400
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
//         filmesJSON.quantidade = dadosFilmes.length
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