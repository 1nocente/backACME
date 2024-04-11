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

const selectAllGeneros = async function () {
    let sql = 'select * from tbl_genero'

    let rsGeneros = await prisma.$queryRawUnsafe(sql)


    if (rsGeneros.length > 0)
        return rsGeneros
    else
        return false
}


module.exports = {
    selectAllGeneros
}

