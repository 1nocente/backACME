//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//Instancia da classe prisma client
const prisma = new PrismaClient()

const selectAllAtores = async function () {
    let sql = 'select * from tbl_ator'

    let rsAtores = await prisma.$queryRawUnsafe(sql)


    if (rsAtores.length > 0)
        return rsAtores
    else
        return false
}

module.exports = {
    selectAllAtores
}