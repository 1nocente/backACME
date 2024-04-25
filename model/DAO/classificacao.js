/*************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no banco de dados MySQL,
 *          aqui realizamos o CRUD utilizando a linguagem SQL
 * DATA: 01/02/2024
 * Autor: Pedro Henrique Inocente
 * Versão: 1.0
 */

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// Instância da classe prisma client
const prisma = new PrismaClient()

// Função para selecionar todas as classificações
const selectAllClassificacoes = async function () {
    let sql = 'SELECT * FROM tbl_classificacao'

    let rsClassificacoes = await prisma.$queryRawUnsafe(sql)

    if (rsClassificacoes.length > 0)
        return rsClassificacoes
    else
        return false
}

// Função para inserir uma nova classificação no Banco de Dados
const insertClassificacao = async function (dadosClassificacao) {
    let sql = `INSERT INTO tbl_classificacao (
                faixa_etaria,
                classificacao,
                caracteristica,
                icone
               ) VALUES (
                '${dadosClassificacao.faixa_etaria}',
                '${dadosClassificacao.classificacao}',
                '${dadosClassificacao.caracteristica}',
                '${dadosClassificacao.icone}'
               );`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result) {
        return true
    } else {
        return false
    }
}

// Função para excluir uma classificação no Banco de Dados
const deleteClassificacao = async function (id) {
    try {
        let sql = `DELETE FROM tbl_classificacao WHERE id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// Função para atualizar uma classificação no Banco de Dados
const updateClassificacao = async function (id, dadosClassificacao) {
    try {
        let sql = `
            UPDATE tbl_classificacao
            SET 
                faixa_etaria = '${dadosClassificacao.faixa_etaria}',
                classificacao = '${dadosClassificacao.classificacao}',
                caracteristica = '${dadosClassificacao.caracteristica}',
                icone = '${dadosClassificacao.icone}'
            WHERE id = ${id};
        `;

        console.log(sql);
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
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacoes,
    insertClassificacao
}
