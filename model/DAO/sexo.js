//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//Instancia da classe prisma client
const prisma = new PrismaClient()

const selectAllSexos = async function () {
    let sql = 'select * from tbl_sexo'

    let rsSexos = await prisma.$queryRawUnsafe(sql)


    if (rsSexos.length > 0)
        return rsSexos
    else
        return false
}

// Função para buscar o sexo de um ator pelo nome
const getSexoByNomeAtor = async function (nome) {
    try {
        // Script SQL para buscar o sexo do ator pelo nome
        let sql = `SELECT tbl_ator.nome, tbl_sexo.nome
                   FROM tbl_ator
                    INNER JOIN tbl_sexo ON tbl_ator.id_sexo = tbl_sexo.id
                      WHERE tbl_ator.nome like "${nome}%";`

                      

        // Encaminha o script SQL para o BD
        let resultado = await prisma.$queryRawUnsafe(sql)

        console.log(resultado);
        return resultado

    } catch (error) {
        console.error("Erro ao buscar o sexo do ator pelo nome:", error)
        return null
    }
}

// Função para buscar o sexo de um ator pelo ID
const getSexoByIdAtor = async function (id) {
    try {
        // Script SQL para buscar o sexo do ator pelo ID
        let sql = `SELECT s.nome 
                   FROM tbl_ator a 
                   INNER JOIN tbl_sexo s ON a.id_sexo = s.id
                   WHERE a.id = ${id}`

        // Encaminha o script SQL para o BD
        let resultado = await prisma.$queryRawUnsafe(sql)

        return resultado

    } catch (error) {
        console.error("Erro ao buscar o sexo do ator pelo ID:", error)
        return null
    }
}

module.exports = {
    selectAllSexos,
    getSexoByIdAtor,
    getSexoByNomeAtor
}