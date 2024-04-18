//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const atoresDAO = require('../model/DAO/ator.js')

const getListarAtores = async function () {

    //Cria um objeto JSON
    let atoresJSON = {}

    //Chama a função do DAO que retorna filmes do BD
    let dadosAtores = await atoresDAO.selectAllAtores()

    //Validação para verificar se o DAO retornou dados
    if (dadosAtores) {
        //cria o JSON para retorna para o app
       atoresJSON.filmes = dadosAtores
       atoresJSON.quantidade = dadosAtores.length
       atoresJSON.status_code = 200

        return atoresJSON
    }
    else {
        return false
    }
}

module.exports = {
    getListarAtores
}