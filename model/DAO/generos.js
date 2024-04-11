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

//Função para inserir um novo genero o Banco de Dados
const insertGenero = async function (dadosGenero) {
    let sql

   sql = `insert into tbl_genero (
                nome
   ) values (
    '${dadosGenero.nome}'
   );`

   


let result = await prisma.$executeRawUnsafe(sql)

if (result) {
    return true
} else {
    return false
    }
}

const getId = async function (dadosFilme) {
 
    let sql 

    try{


        sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_filme limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) { 
            return result
        } else {
            return false
        }

} catch (error) { 
    return false
}
}

//Função para excluir um filme no Banco de Dados
const deleteGenero = async function (id) {

    try {
        // Script SQL para excluir um filme pelo ID
        let sql = `DELETE FROM tbl_genero WHERE id = ${id};`

        // Executa o script SQL no BD
        let result = await prisma.$executeRawUnsafe(sql)
        console.log(result);

        if (result) {
            return true; // Retorna verdadeiro se a exclusão for bem-sucedida
        } else {
            return false; // Retorna falso se a exclusão falhar
        }
    } catch (error) {
        return false; // Retorna falso se ocorrer algum erro durante a exclusão
    }

}


//Função para atualizar um filme no Banco de Dados
const updateGenero = async function (id, dadosGenero) {
    
    try {
        // Script SQL para atualizar um filme pelo ID
        let sql = `
            UPDATE tbl_genero
            SET 
                nome = '${dadosGenero.nome}'
            WHERE id = ${id};
        `;

        // Executa o script SQL
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

module.exports = {
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    insertGenero,
    getId
}

