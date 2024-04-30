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

//Função para inserir um novo filme o Banco de Dados
const insertFilme = async function (dadosFilme) {

    let sql

    try {

        if(dadosFilme.data_relancamento != '' && 
            dadosFilme.data_relancamento != null && 
                dadosFilme.data_relancamento != undefined
                ){

                

         sql = `insert into tbl_filme (
                        nome,
                        sinopse,
                        duracao,
                        data_lancamento,
                        data_relancamento,
                        foto_capa,
                        valor_unitario,
                        id_classificacao
) values (
  '${dadosFilme.nome}',
  '${dadosFilme.sinopse}',
  '${dadosFilme.duracao}',
  '${dadosFilme.data_lancamento}',
  '${dadosFilme.data_relancamento}',
  '${dadosFilme.foto_capa}',
  '${dadosFilme.valor_unitario}',
  '${dadosFilme.id_classificacao}'
  );`

}else{

             sql = `insert into tbl_filme (nome,
                   sinopse,
                   duracao,
                   data_lancamento,
                   data_relancamento,
                   foto_capa,
                   valor_unitario,
                   id_classificacao
) values (
'${dadosFilme.nome}',
'${dadosFilme.sinopse}',
'${dadosFilme.duracao}',
'${dadosFilme.data_lancamento}',
null,
'${dadosFilme.foto_capa}',
'${dadosFilme.valor_unitario}',
'${dadosFilme.id_classificacao}'
);`
}

        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados
        //(inser, update, delete)]
        //$queryRawUnsafe() - serve para executar scripts sem retorno de dados (select)


       // console.log(sql) TA DANDO ERRO FILHO DA PUTA????????? USA ISSO AQUI

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

const getId = async function () {
 
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

//Função para atualizar um filme no Banco de Dados
const updateFilme = async function (id, dadosFilme) {
    
    
    console.log(dadosFilme)
        try {
            // Script SQL para atualizar um filme pelo ID

            let sql
            if(dadosFilme.data_relancamento != '' && 
            dadosFilme.data_relancamento != null && 
                dadosFilme.data_relancamento != undefined
                ){

            sql = `
                UPDATE tbl_filme 
                SET 
                    nome = '${dadosFilme.nome}',
                    sinopse = '${dadosFilme.sinopse}',
                    duracao = '${dadosFilme.duracao}',
                    data_lancamento = '${dadosFilme.data_lancamento}',
                    data_relancamento = '${dadosFilme.data_relancamento}',
                    foto_capa = '${dadosFilme.foto_capa}',
                    valor_unitario = '${dadosFilme.valor_unitario}',
                    id_classificacao = '${dadosFilme.id_classificacao}'
                WHERE id = ${id};
            `;

        }else{
            sql = `
                UPDATE tbl_filme 
                SET 
                    nome = '${dadosFilme.nome}',
                    sinopse = '${dadosFilme.sinopse}',
                    duracao = '${dadosFilme.duracao}',
                    data_lancamento = '${dadosFilme.data_lancamento}',
                    data_relancamento = null,
                    foto_capa = '${dadosFilme.foto_capa}',
                    valor_unitario = '${dadosFilme.valor_unitario}',
                    id_classificacao = '${dadosFilme.id_classificacao}'
                WHERE id = ${id};
            `;

   
   }
    
   
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

//Função para excluir um filme no Banco de Dados
const deleteFilme = async function (id) {


   

    try {
        // Script SQL para excluir um filme pelo ID
        let sql1 = `DELETE FROM tbl_filme_ator WHERE id_filme = ${id};`
        let sql2 = `DELETE FROM tbl_filme_diretor WHERE id_filme = ${id};`
        let sql3 = `DELETE FROM tbl_filme_genero WHERE id_filme = ${id};`
        let sql4 = `DELETE FROM tbl_filme WHERE id = ${id};`

        // Executa o script SQL no BD
        let result1 = await prisma.$executeRawUnsafe(sql1)
        let result2 = await prisma.$executeRawUnsafe(sql2)
        let result3 = await prisma.$executeRawUnsafe(sql3)
        let result4 = await prisma.$executeRawUnsafe(sql4)

        if (result1 && result2 && result3 && result4) {
            return true; // Retorna verdadeiro se a exclusão for bem-sucedida
        } else {
            return false; // Retorna falso se a exclusão falhar
        }
    } catch (error) {
        return false; // Retorna falso se ocorrer algum erro durante a exclusão
    }


}

//Função para listar todos os filmes do Banco de Dados
const selectAllFilmes = async() => {
    try {
     let sql = 'select * from tbl_filme'
     
     let rsfilmes = await prisma.$queryRawUnsafe(sql)
 
     return rsfilmes
 
    } catch (error) {
 
     return false
    }
    
 }

 // DAO para buscar informações dos atores de um filme
const selectAtoresFilme = async (filmeId) => {
    try {
        let atoresQuery = `SELECT a.nome FROM tbl_ator a 
                           JOIN tbl_filme_ator fa ON a.id = fa.id_ator 
                           WHERE fa.id_filme = ${filmeId}`;
        let atores = await prisma.$queryRawUnsafe(atoresQuery);
        return atores.map(ator => ator.nome);
    } catch (error) {
        console.error("Erro ao buscar atores do filme:", error);
        return false;
    }
}

// DAO para buscar informações dos diretores de um filme
const selectDiretoresFilme = async (filmeId) => {
    try {
        let diretoresQuery = `SELECT d.nome FROM tbl_diretor d 
                              JOIN tbl_filme_diretor fd ON d.id = fd.id_diretor 
                              WHERE fd.id_filme = ${filmeId}`;
        let diretores = await prisma.$queryRawUnsafe(diretoresQuery);
        return diretores.map(diretor => diretor.nome);
    } catch (error) {
        console.error("Erro ao buscar diretores do filme:", error);
        return false;
    }
}

 

const selectByNomeFilmes = async function (nomeFilme) {

    try {
        
        let sql = `select * from tbl_filme where nome like "${nomeFilme}%"`
        

        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        

        return rsFilmes

        

       

    } catch (error) {

        return false

    }
}

const selectByIdFilme = async(id) => {
    try{

    //Script sql para filtrar pelo id
    let sql = `select * from tbl_filme where tbl_filme.id = ${id}`

    //Executa o sql no banco de dados
    let rsfilmeId = await prisma.$queryRawUnsafe(sql)

   return rsfilmeId

    } catch(error){
        return false
    }
}

const insertGeneroFilme = async function (idFilme, idGenero){

    let sql

    try {
            sql = `insert into tbl_genero_filme ( genero_id, filme_id ) values 
            ( ${idGenero}, ${idFilme})`
        
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

// Função para inserir atores associados a um filme
const insertAtorFilme = async function (idFilme, idAtor) {
    try {
        const sql = `INSERT INTO tbl_filme_ator (id_filme, id_ator) VALUES (${idFilme}, ${idAtor});`;
        const result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.error("Erro ao inserir ator associado ao filme:", error);
        return false;
    }
}

// Função para inserir diretores associados a um filme
const insertDiretorFilme = async function (idFilme, idDiretor) {
    try {
        const sql = `INSERT INTO tbl_filme_diretor (id_filme, id_diretor) VALUES (${idFilme}, ${idDiretor});`;
        const result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.error("Erro ao inserir diretor associado ao filme:", error);
        return false;
    }
}



module.exports = {
    deleteFilme,
    getId,
    selectByNomeFilmes,
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    insertDiretorFilme,
    insertAtorFilme,
    selectAtoresFilme,
    selectDiretoresFilme,
    insertGeneroFilme
}

