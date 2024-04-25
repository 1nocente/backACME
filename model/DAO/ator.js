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

const insertAtor = async(dadosAtor) => {
    try {
        let sql 
        if(dadosAtor.biografia == '' && dadosAtor.biografia == null && dadosAtor.biografia == undefined){
            sql = `INSERT INTO tbl_ator (nome, data_nascimento, id_sexo) VALUES 
            ("${dadosAtor.nome}", 
            "${dadosAtor.data_nascimento}",
            "${dadosAtor.id_sexo}");`
        }else{
           sql = `INSERT INTO tbl_ator (nome, data_nascimento, biografia, id_sexo) VALUES 
           ("${dadosAtor.nome}", 
           "${dadosAtor.data_nascimento}",
           "${dadosAtor.biografia}",
           "${dadosAtor.id_sexo}");`
            console.log(sql)
        }
        let result = await prisma.$executeRawUnsafe(sql)
       
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }

   
    }

    const updateAtor = async(id, dadosBody) => {
        try {
            let sql
            if(dadosBody.biografia != '' && dadosBody.biografia != null && dadosBody.biografia != undefined){
                sql = `UPDATE tbl_ator SET nome = '${dadosBody.nome}', data_nascimento = '${dadosBody.data_nascimento}', id_sexo = '${dadosBody.id_sexo}' WHERE tbl_ator.id = ${id};`
            }else{
               sql = `UPDATE tbl_ator SET nome = '${dadosBody.nome}', data_nascimento = '${dadosBody.data_nascimento}', biografia = ${dadosBody.biografia}, id_sexo = ${dadosBody.id_sexo} WHERE tbl_ator.id = ${id};`
            }
            let rsupdateator = await prisma.$queryRawUnsafe(sql)
    
            if(rsupdateator)
                return rsupdateator
            else
                return false
    
        } catch (error) {
            return false
        }
    }
    
    const deleteAtor = async(id) => {
        try {
            let sql = `DELETE FROM tbl_ator WHERE tbl_ator.id = ${id}`
    
            let rsdeletedAtor = prisma.$queryRawUnsafe(sql)
            return rsdeletedAtor
        } catch (error) {
            return false
        }
    }


    const selectAtorById = async(id) => {
        try{
            let sql = `select * from tbl_ator where tbl_ator.id = ${id}`
        
            let rsatorId = await prisma.$queryRawUnsafe(sql)
        
           return rsatorId
        
            } catch(error){
                return false
            }
    }

    module.exports = {
    selectAllAtores,
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAtorById
}