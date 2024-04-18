//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//Instancia da classe prisma client
const prisma = new PrismaClient()

const selectAllNacionalidade = async function () {
    let sql = 'select * from tbl_nacionalidade'

    let rsNacionalidades = await prisma.$queryRawUnsafe(sql)


    if (rsNacionalidades.length > 0)
        return rsNacionalidades
    else
        return false
}

// Função para buscar a nacionalidade de um ator pelo nome
const getNacionalidadeByNomeAtor = async function (nome) {
    try {
        // Script SQL para buscar a nacionalidade do ator pelo nome
        let sql = `SELECT n.nome 
                   FROM tbl_ator a 
                   INNER JOIN tbl_ator_nacionalidade an ON a.id = an.id_ator
                   INNER JOIN tbl_nacionalidade n ON an.id_nacionalidade = n.id
                   WHERE a.nome like "${nome}%"`

        // Encaminha o script SQL para o BD
        let resultado = await prisma.$queryRawUnsafe(sql)

        return resultado

    } catch (error) {
        console.error("Erro ao buscar a nacionalidade do ator pelo nome:", error)
        return null
    }
}

// Função para buscar a nacionalidade de um ator pelo ID
const getNacionalidadeByIdAtor = async function (id) {
    try {
        // Script SQL para buscar a nacionalidade do ator pelo ID
        let sql = `SELECT n.nome 
                   FROM tbl_ator a 
                   INNER JOIN tbl_ator_nacionalidade an ON a.id = an.id_ator
                   INNER JOIN tbl_nacionalidade n ON an.id_nacionalidade = n.id
                   WHERE a.id = ${id}`

        // Encaminha o script SQL para o BD
        let resultado = await prisma.$queryRawUnsafe(sql)

        return resultado

    } catch (error) {
        console.error("Erro ao buscar a nacionalidade do ator pelo ID:", error)
        return null
    }
}


module.exports = {
    selectAllNacionalidade,
    getNacionalidadeByIdAtor,
    getNacionalidadeByNomeAtor
}