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
    let generosJSON = {}

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

const setInserirNovoGenero = async function (dadosGenero, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let novoGeneroJSON = {}
            
            if (dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.lenght > 20) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let validateStatus = true

                if (validateStatus) {
                    let novoGenero = await generosDAO.insertGenero(dadosGenero)

                    let novoId = await generosDAO.getId()


                    //Validação para verificar se o DAO inseriu os dados no banco
                    if (novoGenero && novoId) {

                        const idPego = novoId[0].id
                        //Cria o JSON de retorno dos dados (201)
                        novoGeneroJSON.genero = dadosGenero
                        novoGeneroJSON.id = `novo id -> ${idPego}`
                        novoGeneroJSON.status = message.SUCCESS_CREATED_ITEM.status
                        novoGeneroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoGeneroJSON.message = message.SUCCESS_CREATED_ITEM.message

                        return novoGeneroJSON // 201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500 // 
                    }
                }
            }


        } else {
            return message.ERROR_CONTENT_TYPE //415 

        }
    } catch (error) {
        console.log(error);

        return message.ERROR_INTERNAL_SERVER //500
    }


}

//Função para excluir um genero
const setExcluirGenero = async function (id) {

    try {
        // Chama a função do modelo para excluir o filme no BD
        let resultadoExclusao = await generosDAO.deleteGenero(id);

        if (resultadoExclusao) {
            return { status_code: 200, message: "genero excluído com sucesso." };
        } else {
            return { status_code: 404, message: "genero não encontrado ou não pôde ser excluído." };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno do servidor ao excluir o genero." };
    }
}

//Função para atualizar um genero
const setAtualizarGenero = async function (id, dadosGenero) {

    try {
        // Chama a função do model para atualizar o genero
        let generoAtualizado = await generosDAO.updateGenero(id, dadosGenero);

        if (generoAtualizado) {
            return { message: 'Genero atualizado com sucesso', status_code: 200 };
        } else {
            return { message: 'Falha ao atualizar o Genero', status_code: 500 };
        }
    } catch (error) {
        console.log(error);
        return { message: 'Erro interno do servidor', status_code: 500 };
    }
}

module.exports = {
    setAtualizarGenero,
    setExcluirGenero,
    setInserirNovoGenero,
    getListarGeneros
}