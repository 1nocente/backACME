//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const nacionaliadeDAO = require('../model/DAO/nacionalidade.js')



const getListarNacionalidade = async function () {

    //Cria um objeto JSON
    let nacionalidadeJSON = {}

    //Chama a função do DAO que retorna filmes do BD
    let dadosNacionalidade = await nacionaliadeDAO.selectAllNacionalidade()

    //Validação para verificar se o DAO retornou dados
    if (dadosNacionalidade) {
        //cria o JSON para retorna para o app
       nacionalidadeJSON.filmes = dadosNacionalidade
       nacionalidadeJSON.quantidade = dadosNacionalidade.length
       nacionalidadeJSON.status_code = 200

        return nacionalidadeJSON
    }
    else {
        return false
    }
}

const getNacionalidadeNomeAtor = async function (nome) {
    try {
        // Chamada à função que busca a nacionalidade do ator pelo nome
        const resultado = await nacionaliadeDAO.getNacionalidadeByNomeAtor(nome);

        if (resultado && resultado.length > 0) {
            // Retorna o resultado obtido
            return { status_code: 200, nacionalidade: resultado[0].nome };
        } else {
            return { status_code: 404, message: "Ator não encontrado" };
        }
    } catch (error) {
        console.error("Erro ao buscar a nacionalidade do ator pelo nome:", error);
        return { status_code: 500, message: "Erro interno do servidor" };
    }
}


const getNacionalidadeIdAtor = async function (id) {
    try {
        // Validação para verificar se o ID é válido
        if (!id || isNaN(id)) {
            return { status_code: 400, message: "ID inválido" };
        } else {
            // Chamada à função que busca a nacionalidade do ator pelo ID
            const resultado = await nacionaliadeDAO.getNacionalidadeByIdAtor(id);

            if (resultado) {
                // Retorna o resultado obtido
                return { status_code: 200, nacionalidade: resultado[0].nome };
            } else {
                return { status_code: 404, message: "Ator não encontrado" };
            }
        }
    } catch (error) {
        console.error("Erro ao buscar a nacionalidade do ator pelo ID:", error);
        return { status_code: 500, message: "Erro interno do servidor" };
    }
}




module.exports = {
    getListarNacionalidade,
    getNacionalidadeNomeAtor,
    getNacionalidadeIdAtor
}