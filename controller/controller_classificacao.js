/*************************************************************************************
 * Objetivo: Arquivo responsável pelas validações e consistências de dados das classificações
 * DATA: 01/02/2024
 * Autor: Pedro Henrique Inocente
 * Versão: 1.0
 */

// Import do arquivo de configuração do projeto
const message = require('../module/config.js')

// Import do arquivo responsável pela interação com o BD (model)
const classificacaoDAO = require('../model/DAO/classificacao.js')

const getListarClassificacoes = async function () {
    let classificacoesJSON = {}

    let dadosClassificacoes = await classificacaoDAO.selectAllClassificacoes()

    if (dadosClassificacoes) {
        classificacoesJSON.classificacoes = dadosClassificacoes
        classificacoesJSON.quantidade = dadosClassificacoes.length
        classificacoesJSON.status_code = 200

        return classificacoesJSON
    } else {
        return false
    }
}

const setInserirNovaClassificacao = async function (dadosClassificacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novaClassificacaoJSON = {}
            
            // Validação dos dados da classificação
            if (dadosClassificacao.faixa_etaria == '' || dadosClassificacao.faixa_etaria == undefined ||
                dadosClassificacao.classificacao == '' || dadosClassificacao.classificacao == undefined ||
                dadosClassificacao.caracteristica == '' || dadosClassificacao.caracteristica == undefined ||
                dadosClassificacao.icone == '' || dadosClassificacao.icone == undefined) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novaClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao)

                // Verifica se a inserção foi bem-sucedida
                if (novaClassificacao) {
                    novaClassificacaoJSON.classificacao = dadosClassificacao
                    novaClassificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
                    novaClassificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novaClassificacaoJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novaClassificacaoJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirClassificacao = async function (id) {
    try {
        let resultadoExclusao = await classificacaoDAO.deleteClassificacao(id)

        if (resultadoExclusao) {
            return { status_code: 200, message: "Classificação excluída com sucesso." }
        } else {
            return { status_code: 404, message: "Classificação não encontrada ou não pôde ser excluída." }
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno do servidor ao excluir a classificação." }
    }
}

const setAtualizarClassificacao = async function (id, dadosClassificacao) {
    try {
        let classificacaoAtualizada = await classificacaoDAO.updateClassificacao(id, dadosClassificacao)

        if (classificacaoAtualizada) {
            return { message: 'Classificação atualizada com sucesso', status_code: 200 }
        } else {
            return { message: 'Falha ao atualizar a classificação', status_code: 500 }
        }
    } catch (error) {
        console.log(error)
        return { message: 'Erro interno do servidor', status_code: 500 }
    }
}

module.exports = {
    setAtualizarClassificacao,
    setExcluirClassificacao,
    setInserirNovaClassificacao,
    getListarClassificacoes
}
