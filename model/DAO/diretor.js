//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//Instancia da classe prisma client
const prisma = new PrismaClient()

const selectAllDiretores = async function () {
    let sql = 'select * from tbl_diretor'

    let rsDiretores = await prisma.$queryRawUnsafe(sql)


    if (rsDiretores.length > 0)
        return rsDiretores
    else
        return false
}

const insertDiretor = async(dadosDiretor) => {
    try {
        let sql 
        if(dadosDiretor.biografia == '' && dadosDiretor.biografia == null && dadosDiretor.biografia == undefined){
            sql = `INSERT INTO tbl_diretor (nome, data_nascimento, id_sexo) VALUES 
            ("${dadosDiretor.nome}", 
            "${dadosDiretor.data_nascimento}",
            "${dadosDiretor.id_sexo}");`
        }else{
           sql = `INSERT INTO tbl_diretor (nome, data_nascimento, biografia, id_sexo) VALUES 
           ("${dadosDiretor.nome}", 
           "${dadosDiretor.data_nascimento}",
           '${dadosDiretor.biografia}',
           "${dadosDiretor.id_sexo}");`
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

    const updateDiretor = async (id, dadosBody) => {
        try {
            let sql;
            if (dadosBody.biografia != null && dadosBody.biografia != undefined) {
                sql = `UPDATE tbl_diretor SET nome = '${dadosBody.nome}', nome_artistico = '${dadosBody.nome_artistico}', data_nascimento = '${dadosBody.data_nascimento}', data_falecimento = ${dadosBody.data_falecimento ? "'" + dadosBody.data_falecimento + "'" : null}, biografia = '${dadosBody.biografia}', foto = '${dadosBody.foto}', id_sexo = ${dadosBody.id_sexo} WHERE id = ${id};`;
                console.log(sql);
            } else {
                sql = `UPDATE tbl_diretor SET nome = '${dadosBody.nome}', nome_artistico = '${dadosBody.nome_artistico}', data_nascimento = '${dadosBody.data_nascimento}', data_falecimento = ${dadosBody.data_falecimento ? "'" + dadosBody.data_falecimento + "'" : null}, foto = '${dadosBody.foto}', id_sexo = ${dadosBody.id_sexo} WHERE id = ${id};`;
                console.log(sql);
            }
            let rsupdatediretor = await prisma.$queryRawUnsafe(sql);
    
            if (rsupdatediretor)
                return rsupdatediretor;
            else
                return false;
    
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    


    const deleteDiretor = async function (id){
    
        let idDiretor = id
    
        try {
            let sql = `delete from tbl_diretor where id = ${idDiretor};`

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

    const deleteNacionalidadeDiretor = async function (id) {
        let idDiretor = id
    
        try {
            let sql = `delete from tbl_diretor_nacionalidade where id_diretor = ${idDiretor};`
    

            console.log(sql);
            let result = await prisma.$executeRawUnsafe(sql)

            console.log(result);
         
            if (result)
                return true
            else
                return false
    
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const deleteFilmeDiretor = async function (id) {
        let idDiretor = id
    
        try {
            let sql = `delete from tbl_filme_diretor where id_diretor = ${idDiretor};`
    

            console.log(sql);
            let result = await prisma.$executeRawUnsafe(sql)

            console.log(result);
         
            if (result)
                return true
            else
                return false
    
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const selectDiretorById = async(id) => {
        try{
            let sql = `select * from tbl_diretor where tbl_diretor.id = ${id}`
        
            let rsatorId = await prisma.$queryRawUnsafe(sql)
        
           return rsatorId
        
            } catch(error){
                return false
            }
    }


    const selectLastIdDiretor = async function () {
 
        let sql 
    
        try{
    
    
            sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_diretor limit 1;`
    
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
    selectAllDiretores,
    insertDiretor,
    selectLastIdDiretor,
    deleteDiretor,
    deleteFilmeDiretor,
    deleteNacionalidadeDiretor,
    updateDiretor,
    selectDiretorById

    
}