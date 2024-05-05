/*************************************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistencias de dados dos filmes
 * DATA: 01/02/2024
 * Autor: Pedro Henrique Inocente
 * Versão: 1.0
 */

//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const FilmesDAO = require('../model/DAO/filme.js')
const  GenerosDAO = require('../model/DAO/generos.js')

//Função para inserir um novo filme
const setInserirNovoFilme = async function (dadosFilme, contentType) {
    try {
        // Validação do content-type (apenas application/json)

        if (String(contentType).toLowerCase() == 'application/json') {


            // Cria o objeto JSON 
            let novoFilmeJSON = {};
            // Validação dos campos obrigatórios e com digitação inválida
            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario > 999 || dadosFilme.id_classificacao == null
            ) {

                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let validateStatus = false;


                // Verifica se a data de relançamento é válida
                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != undefined) {


                    if (dadosFilme.data_relancamento.length != 10) {


                        return message.ERROR_REQUIRED_FIELDS; // 400
                    } else {
                        validateStatus = true;
                    }
                } else {
                    validateStatus = true;
                }

                // Validação para verificar se a variável booleana é verdadeira
                if (validateStatus) {

                    // Insere o filme no banco de dados, incluindo a classificação
                    let novoFilme = await FilmesDAO.insertFilme(dadosFilme);
                    let novoId = await FilmesDAO.getId();

                    // Validação para verificar se o DAO inseriu os dados no banco

                    // Códigos de validação existentes...

                    if (novoFilme && novoId) {
                        const idPego = novoId[0].id
                        let elenco = dadosFilme.elenco
                        let diretor = dadosFilme.diretor
                        let genero = dadosFilme.genero

                        for (let index = 0; index < elenco.length; index++) {
                            const element = elenco[index];
                                await FilmesDAO.insertAtorFilme(idPego, element);
                                console.log(dadosFilme);

                        }
                        for (let index = 0; index < diretor.length; index++) {
                            const element = diretor[index];
                                await FilmesDAO.insertDiretorFilme(idPego, element);
                          
                        }
                        for (let index = 0; index < genero.length; index++) {
                            const element = genero[index];
                                await FilmesDAO.insertGeneroFilme(idPego, element)
                        }

                        // Cria o JSON de retorno dos dados (201)
                        novoFilmeJSON.filme = dadosFilme;
                        novoFilmeJSON.id = `novo id -> ${idPego}`;
                        novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status;
                        novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message;

                        return novoFilmeJSON; // 201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB; // 500 
                    }
                }
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // 500
    }
}


const setAtualizarFilme = async function (id, dadosFilme, contentType) {


    try {

        //Validação de content-type (apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            //Cria o objeto JSON 
            let filmeJSON = {}

            //Validação de campos obrigatorios ou com digitação invalida
            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa > 200 || dadosFilme.id_classificacao == null ||
                dadosFilme.valor_unitario.length > 6
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let validateStatus = false


                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != undefined) {


                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }

                if (validateStatus) {
                    let filme = await FilmesDAO.updateFilme(id, dadosFilme)



                    //Validação para verificar se o DAO inseriu os dados no banco
                    if (filme) {

                        filmeJSON.filme = dadosFilme
                        filmeJSON.status = message.SUCCESS_CREATED_ITEM.status
                        filmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        filmeJSON.message = message.SUCCESS_CREATED_ITEM.message

                        return filmeJSON // 201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500 // 
                    }
                }
            }


        } else {


            return message.ERROR_CONTENT_TYPE //415 

        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }


}

//Função para atualizar um filme
// const setAtualizarFilme = async function (id, dadosFilme) {

//     try {
//         // Chama a função do model para atualizar o filme
//         let filmeAtualizado = await FilmesDAO.updateFilme(id, dadosFilme);

//         if (filmeAtualizado) {
//             return { message: 'Filme atualizado com sucesso', status_code: 200 };
//         } else {
//             return { message: 'Falha ao atualizar o filme', status_code: 500 };
//         }
//     } catch (error) {
//         return { message: 'Erro interno do servidor', status_code: 500 };
//     }
// }


//Função para excluir um filme
const setExcluirFilme = async function (id) {

    try {
        // Chama a função do modelo para excluir o filme no BD
        let resultadoExclusao = await FilmesDAO.deleteFilme(id);

        if (resultadoExclusao) {
            console.log(resultadoExclusao);
            return { status_code: 200, message: "Filme excluído com sucesso." };
        } else {
            return { status_code: 200, message: "Filme excluído com sucesso." };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno do servidor ao excluir o filme." };
    }
}


//Função para listar todos os filmes
const getListarFilmes = async() => {
    try {
        // Obtém todos os filmes do banco de dados
        let filmesJSON = {};
        let dadosFilmes = await FilmesDAO.selectAllFilmes();

        // Valida se existem dados de filmes
        if (dadosFilmes) {
            if (dadosFilmes.length > 0) {
                // Cria um array para armazenar os detalhes de cada filme
                filmesJSON.filmes = [];

                // Para cada filme, obtém os atores e diretores associados
                for (const filme of dadosFilmes) {
                    let atores = await FilmesDAO.selectAtoresFilme(filme.id);
                    let diretores = await FilmesDAO.selectDiretoresFilme(filme.id);
                    let generos = await GenerosDAO.selectGenerosFilme(filme.id)

                    // Adiciona os detalhes do filme, atores e diretores ao array de filmes
                    filmesJSON.filmes.push({
                        id: filme.id,
                        nome: filme.nome,
                        sinopse: filme.sinopse,
                        duracao: filme.duracao,
                        data_lancamento: filme.data_lancamento,
                        foto_capa: filme.foto_capa,
                        valor_unitario: filme.valor_unitario,
                        id_classificacao: filme.id_classificacao,
                        atores: atores,
                        diretores: diretores,
                        generos: generos
                    });
                }

                // Define a quantidade de filmes retornados e o status code
                filmesJSON.quantidade = filmesJSON.filmes.length;
                filmesJSON.status_code = 200;

                return filmesJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }
    } catch (error) {
        console.error("Erro ao obter a lista de filmes:", error);
        return message.ERROR_INTERNAL_SERVER; //500
    }
}


//função para buscar um filmes pelo Id.
const getBuscarFilme = async(id) => {
    //Recebe o id do filme em uma variável local
    let idFilme = id

    //Cria o objeto JSON
    let filmeJSON = {}

    //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID //400
    }else{
        //Encaminha o ID para o DAO buscar no BD
        let dadosFilme = await FilmesDAO.selectByIdFilme(idFilme)

        //Verifica se o DAO retornou dados
        if(dadosFilme){

            //Validação para verificar a quantidade de itens encontrados
            if(dadosFilme.length > 0){
                //Cria o JSON para retorno
                filmeJSON.filme = dadosFilme
                filmeJSON.status_code = 200

                return filmeJSON
            }else{
                return message.ERROR_NOT_FOUND
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

const getFiltrarFilmes = async function (filter, contentType) {

    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let filmesJSON = {};

            let listaGeneros = []
            filter.generos.forEach(genero => {
                if(genero.checked){
                    listaGeneros.push(genero.id)
                }
            });
            const generosSelecionados = listaGeneros.join(',')
            let search = filter.search
            let sql = `SELECT Filmes.id,Filmes.nome,sinopse,duracao,data_lancamento,data_relancamento,foto_capa,foto_fundo,cor,id_classificacao_indicativa AS classificacao, (SELECT GROUP_CONCAT(Generos.nome SEPARATOR ', ') FROM filme_genero INNER JOIN Generos ON filme_genero.id_genero = Generos.id WHERE filme_genero.id_filme = Filmes.id) AS Genero FROM Filmes LEFT JOIN filme_genero ON Filmes.id = filme_genero.id_filme LEFT JOIN Generos ON filme_genero.id_genero = Generos.id 
            WHERE (Filmes.nome LIKE '%${search}%' OR Filmes.sinopse LIKE '%${search}%') AND (Filmes.id_classificacao_indicativa<=${filter.maxAge}) AND (Filmes.data_lancamento>='0001-01-01' AND Filmes.data_lancamento<='9999-12-31') AND (Generos.id IN (0)) GROUP BY Filmes.id`
            
            if(listaGeneros.length>0){
                sql = sql.replace('(0)',`(${generosSelecionados})`)
            }
            if(filter.dataMinima){
                sql =sql.replace('0001-01-01',`${filter.dataMinima}`)
            }
            if(filter.dataMaxima){
                sql =sql.replace('9999-12-31',`${filter.dataMaxima}`)
            }

            console.log(sql)
            let dadosFilmes = await DAO.selectFilterFilmes(sql);
                if (dadosFilmes) {
                if(dadosFilmes.length > 0) {
                    filmesJSON.filmes = dadosFilmes;
                    filmesJSON.quantidade = dadosFilmes.length;
                    filmesJSON.status_code = 200;
                    return filmesJSON;
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error){
        console.log(error)
    return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
}
}



const getNomeFilme = async function (nomeFilme) {

    let nome = nomeFilme

    //Cria um objeto JSON
    let filmeJSON = {}


    if (nome == '' || nome == undefined) {
        return message.ERROR_INVALID_NAME //400
    } else {

        let nomeDoFilme = await FilmesDAO.selectByNomeFilmes(nome)

        if (nomeDoFilme) {

            if (nomeDoFilme.length > 0) {

                filmeJSON.filme = nomeDoFilme
                filmeJSON.status_code = 200

                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }


    





    //    //Chama a função do DAO que retorna filmes do BD
    //    let dadosFilmes = await FilmesDAO.selectByNomeFilmes(nomeFilme)

    //    //Validação para verificar se o DAO retornou dados
    //    if (dadosFilmes){
    //     //cria o JSON para retorna para o app
    //     filmesJSON.filmes = dadosFilmes
    //         filmesJSON.quantidade = dadosFilmes.length
    //             filmesJSON.status_code = 200

    //                 return filmesJSON 
    //    }
    //    else{
    //     return {status_code: 400, message: ''}
    //    }

}
module.exports = {
    getNomeFilme,
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarFilmes
}