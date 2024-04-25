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

const insertAtorNacionalidade = async(id_ator, id_nacionalidade) => {
    try {
        let sql = `INSERT INTO tbl_ator_nacionalidade (id_ator, id_nacionalidade) VALUES ('${id_ator}', '${id_nacionalidade}')`
        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAtorNacionalidade = async(id, id_ator, id_nacionalidade) => {
    try {
        let sql = `UPDATE tbl_ator_nacionalidade SET id_ator = '${id_ator}', id_nacionalidade = '${id_nacionalidade}' WHERE tbl_ator_nacionalidade.id = ${id_ator};`
        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByAtor = async(id) => {
    try {
        let sql = `SELECT tbl_nacionalidade.id, nome FROM tbl_nacionalidade JOIN tbl_ator_nacionalidade ON tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade WHERE id_ator = ${id}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByAtor2 = async(id_ator) => {
    try {
        let sql = `SELECT id FROM tbl_ator_nacionalidade WHERE id_ator = ${id_ator};`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}











const getNacionalidadeByNomeDiretor = async function (nome) {
    try {
        // Script SQL para buscar a nacionalidade do ator pelo nome
        let sql = `SELECT n.nome 
                   FROM tbl_diretor a 
                   INNER JOIN tbl_diretor_nacionalidade an ON a.id = an.id_diretor
                   INNER JOIN tbl_nacionalidade n ON an.id_nacionalidade = n.id
                   WHERE a.nome like "${nome}%"`

        // Encaminha o script SQL para o BD
        let resultado = await prisma.$queryRawUnsafe(sql)

        return resultado

    } catch (error) {
        console.error("Erro ao buscar a nacionalidade do diretor pelo nome:", error)
        return null
    }
}

// Função para buscar a nacionalidade de um ator pelo ID
const getNacionalidadeByIdDiretor = async function (id) {
    try {
        // Script SQL para buscar a nacionalidade do ator pelo ID
        let sql = `SELECT n.nome 
                   FROM tbl_diretor a 
                   INNER JOIN tbl_diretor_nacionalidade an ON a.id = an.id_diretor
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

const insertDiretorNacionalidade = async(id_diretor, id_nacionalidade) => {
    try {
        let sql = `INSERT INTO tbl_diretor_nacionalidade (id_diretor, id_nacionalidade) VALUES ('${id_diretor}', '${id_nacionalidade}')`
        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}

const updateDiretorNacionalidade = async(id, id_diretor, id_nacionalidade) => {
    try {
        let sql = `UPDATE tbl_diretor_nacionalidade SET id_diretor = '${id_diretor}', id_nacionalidade = '${id_nacionalidade}' WHERE tbl_diretor_nacionalidade.id = ${id_diretor};`
        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByDiretor = async(id) => {
    try {
        let sql = `SELECT tbl_nacionalidade.id, nome FROM tbl_nacionalidade JOIN tbl_diretor_nacionalidade ON tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade WHERE id_diretor = ${id}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByDiretor2 = async(id_diretor) => {
    try {
        let sql = `SELECT id FROM tbl_diretor_nacionalidade WHERE id_diretor = ${id_diretor};`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}










module.exports = {
    selectAllNacionalidade,
    getNacionalidadeByIdAtor,
    getNacionalidadeByNomeAtor,
    insertAtorNacionalidade,
    updateAtorNacionalidade,
    selectNacionalidadeByAtor,
    selectNacionalidadeByAtor2,
    selectNacionalidadeByDiretor,
    getNacionalidadeByIdDiretor,
    getNacionalidadeByNomeDiretor,
    selectNacionalidadeByDiretor,
    selectNacionalidadeByDiretor2,
    updateDiretorNacionalidade,
    insertDiretorNacionalidade

}