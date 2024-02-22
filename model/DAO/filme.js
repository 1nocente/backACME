/*************************************************************************************
 * Objetivo: Arquivo responsave pela manipulção de dados no banco de dados MYSQL,
 *             aqui realizamos o CRUD utilizando a linguagem SQL
 * DATA: 01/02/2024
 * Autor: Pedro Henrique Inocente
 * Versão: 1.0
 */

//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//Instancia da classe prisma client
const prisma = new PrismaClient()

//Função para inserir um novo filme o Banco de Dados
const insertFilme = async function (){
    
}

//Função para atualizar um filme no Banco de Dados
const updateFilme = async function (){

}

//Função para excluir um filme no Banco de Dados
const deleteFilme = async function (){

}

//Função para listar todos os filmes do Banco de Dados
const selectAllFilmes = async function (){
    let sql = 'select * from tbl_filme'

    let rsFilmes = await prisma.$queryRawUnsafe(sql)


    if(rsFilmes.length > 0)
        return rsFilmes
    else
        return false

    // $queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme where nome = '+ variavel')
}

const selectByNomeFilmes = async function (nomeFilme) {

    try{
    let sql = `select * from tbl_filme where nome like "${nomeFilme}%"`

    let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes

    } catch (error) {

        return false

    }
}

//Função para buscar um filme do banco de dados pelo ID
const selectByIdFilmes = async function (id){

    try{
    // script sql para buscar um filme pelo id
    let sql = `select * from tbl_filme where id = ${id}`
    
    //Encaminha o script SQL para o BD
    let rsFilme = await prisma.$queryRawUnsafe(sql)

    return rsFilme
        
    } catch (error) {

        return false
        
    }
}



module.exports = {

    selectByNomeFilmes,
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilmes,
}

