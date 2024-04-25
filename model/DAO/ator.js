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

    const updateAtor = async (id, dadosBody) => {
        try {
            let sql;
            if (dadosBody.biografia != null && dadosBody.biografia != undefined) {
                sql = `UPDATE tbl_ator SET nome = '${dadosBody.nome}', nome_artistico = '${dadosBody.nome_artistico}', data_nascimento = '${dadosBody.data_nascimento}', data_falecimento = ${dadosBody.data_falecimento ? "'" + dadosBody.data_falecimento + "'" : null}, biografia = '${dadosBody.biografia}', foto = '${dadosBody.foto}', id_sexo = ${dadosBody.id_sexo} WHERE id = ${id};`;
                console.log(sql);
            } else {
                sql = `UPDATE tbl_ator SET nome = '${dadosBody.nome}', nome_artistico = '${dadosBody.nome_artistico}', data_nascimento = '${dadosBody.data_nascimento}', data_falecimento = ${dadosBody.data_falecimento ? "'" + dadosBody.data_falecimento + "'" : null}, foto = '${dadosBody.foto}', id_sexo = ${dadosBody.id_sexo} WHERE id = ${id};`;
                console.log(sql);
            }
            let rsupdateator = await prisma.$queryRawUnsafe(sql);
    
            if (rsupdateator)
                return rsupdateator;
            else
                return false;
    
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    


    const deleteAtor = async function (id){
    
        let idAtor = id
    
        try {
            let sql = `delete from tbl_ator where id = ${idAtor};`

            console.log(sql);
    
            let result = await prisma.$executeRawUnsafe(sql)
           
            if (result)
                return true
            else
                return false
    
    
        } catch (error) {
            
            return false
        }
    
    }

    const deleteNacionalidadeAtor = async function (id) {
        let idAtor = id
    
        try {
            let sql = `delete from tbl_ator_nacionalidade where id_ator = ${idAtor};`
    

            console.log(sql);
            let result = await prisma.$executeRawUnsafe(sql)
         
            if (result)
                return true
            else
                return false
    
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const deleteFilmeAtor = async function (id) {
        let idAtor = id
    
        try {
            let sql = `delete from tbl_filme_ator where id_ator = ${idAtor};`
    

            console.log(sql);
            let result = await prisma.$executeRawUnsafe(sql)
         
            if (result)
                return true
            else
                return false
    
        } catch (error) {
            console.log(error)
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


    const selectLastIdAtor = async function () {
 
        let sql 
    
        try{
    
    
            sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_ator limit 1;`
    
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

    module.exports = {
    selectAllAtores,
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAtorById,
    selectLastIdAtor,
    deleteNacionalidadeAtor,
    deleteFilmeAtor
}