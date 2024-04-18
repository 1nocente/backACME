//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const sexoDAO = require('../model/DAO/sexo.js')



const getListarSexo = async function () {

    //Cria um objeto JSON
    let sexoJSON = {}

    //Chama a função do DAO que retorna filmes do BD
    let dadosSexo = await sexoDAO.selectAllSexos()

    //Validação para verificar se o DAO retornou dados
    if (dadosSexo) {
        //cria o JSON para retorna para o app
        sexoJSON.filmes = dadosSexo
        sexoJSON.quantidade = dadosSexo.length
        sexoJSON.status_code = 200

        return sexoJSON
    }
    else {
        return false
    }
}

const getSexoIdAtor = async function (id) {
    try {
        // Validação para verificar se o ID é válido (vazio, indefinido e não numérico)
        if (id === '' || id === undefined || isNaN(id)) {
            return { status_code: 400, message: "ID inválido" };
        } else {
            // Chamada à função que busca o sexo do ator pelo ID
            const resultado = await sexoDAO.getSexoByIdAtor(id);

            if (resultado) {
                // Retorna o resultado obtido
                return { status_code: 200, sexo: resultado[0].nome };
            } else {
                return { status_code: 404, message: "Ator não encontrado" };
            }
        }
    } catch (error) {
        console.error("Erro ao buscar o sexo do ator pelo ID:", error);
        return { status_code: 500, message: "Erro interno do servidor" };
    }
}

const getSexoNomeAtor = async function (nome) {
    try {
        // Validação para verificar se o nome foi fornecido
        if (!nome || typeof nome !== 'string') {
            return { status_code: 400, message: "Nome inválido" };
        } else {
            // Chamada à função que busca o sexo do ator pelo nome
            const resultado = await sexoDAO.getSexoByNomeAtor(nome);

            if (resultado) {
                // Retorna o resultado obtido
                return { status_code: 200, sexo: resultado[0].nome };
            } else {
                return { status_code: 404, message: "Ator não encontrado" };
            }
        }
    } catch (error) {
        console.error("Erro ao buscar o sexo do ator pelo nome:", error);
        return { status_code: 500, message: "Erro interno do servidor" };
    }
}



module.exports = {
    getListarSexo,
    getSexoIdAtor,
    getSexoNomeAtor
}