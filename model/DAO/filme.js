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
                        valor_unitario
) values (
  '${dadosFilme.nome}',
  '${dadosFilme.sinopse}',
  '${dadosFilme.duracao}',
  '${dadosFilme.data_lancamento}',
  '${dadosFilme.data_relancamento}',
  '${dadosFilme.foto_capa}',
  '${dadosFilme.valor_unitario}'
  );`

}else{
             sql = `insert into tbl_filme (nome,
                   sinopse,
                   duracao,
                   data_lancamento,
                   data_relancamento,
                   foto_capa,
                   valor_unitario
) values (
'${dadosFilme.nome}',
'${dadosFilme.sinopse}',
'${dadosFilme.duracao}',
'${dadosFilme.data_lancamento}',
null,
'${dadosFilme.foto_capa}',
'${dadosFilme.valor_unitario}'
);`
}

        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados
        //(inser, update, delete)]
        //$queryRawUnsafe() - serve para executar scripts sem retorno de dados (select)



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

//Função para atualizar um filme no Banco de Dados
const updateFilme = async function (id, dadosFilme) {
    
        try {
            // Script SQL para atualizar um filme pelo ID
            let sql = `
                UPDATE tbl_filme 
                SET 
                    nome = '${dadosFilme.nome}',
                    sinopse = '${dadosFilme.sinopse}',
                    duracao = '${dadosFilme.duracao}',
                    data_lancamento = '${dadosFilme.data_lancamento}',
                    data_relancamento = '${dadosFilme.data_relancamento}',
                    foto_capa = '${dadosFilme.foto_capa}',
                    valor_unitario = '${dadosFilme.valor_unitario}'
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

//Função para excluir um filme no Banco de Dados
const deleteFilme = async function (id) {

    try {
        // Script SQL para excluir um filme pelo ID
        let sql = `DELETE FROM tbl_filme WHERE id = ${id};`

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

//Função para listar todos os filmes do Banco de Dados
const selectAllFilmes = async function () {
    let sql = 'select * from tbl_filme'

    let rsFilmes = await prisma.$queryRawUnsafe(sql)


    if (rsFilmes.length > 0)
        return rsFilmes
    else
        return false

    // $queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme where nome = '+ variavel')
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


//Função para buscar um filme do banco de dados pelo ID
const selectByIdFilmes = async function (id) {

    try {
        // script sql para buscar um filme pelo id
        let sql = `select * from tbl_filme where id = ${id}`

        //Encaminha o script SQL para o BD
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme

    } catch (error) {

        return false

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
    selectByIdFilmes,
}

