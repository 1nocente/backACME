/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela pafronização de variaveis e constantes globais do projeto
 * Data: 22/02/2024
 * Autor: Pedro Henrique Inocente
 * Versão: 1.0
 * *****************************************************************************************************
 * 
 * ************************************MENSAGENS DE ERRO DO PROJETO****************************************************/ 

const ERROR_INVALID_ID         =         {status: false, status_code: 400, message: ' O ID encaminhado na requisição não é valido !!'}
const ERROR_INVALID_NAME       =         {status: false, status_code: 400, message: ' O Nome encaminhado na requisição não é valido !!'}
const ERROR_REQUIRED_FIELDS    =         {status: false, status_code: 400, message: ' Existem campos requeridos que nao foram preenchidos, ou não atendem aos critérios de digitação  '}
const ERROR_NOT_FOUND          =         {status: false, status_code: 404, message: 'Não foi encontrado nenhum item'}
const ERROR_INTERNAL_SERVER_DB =         {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a um erro no acesso ao Banco De Dados, contate o adm da API !!'}
const ERROR_CONTENT_TYPE       =         {status: false, status_code: 415, message: 'O content-type encaminhado na requisição não é suportado pelo servidor. deve-se encaminhar apenas requisições com applicatio/json !!'}
const ERROR_INTERNAL_SERVER    =         {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a um erro na camada de negócio/controle da aplicação, contate o adm da API !!'}

/* ************************************MENSAGENS DE SUCESSO****************************************************/ 

const SUCCESS_CREATED_ITEM     =         {status: true,  status_code: 201, message: 'Item criado com Sucesso!!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID_NAME,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER
}