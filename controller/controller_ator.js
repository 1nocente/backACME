//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const atoresDAO = require('../model/DAO/ator.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')

const getListarAtores = async function () {
    try {
        // Chama a função do DAO que retorna atores do BD
        let dadosAtores = await atoresDAO.selectAllAtores()

        // Validar se há dados de atores
        if (!dadosAtores) {
            return { message: "Nenhum ator encontrado" }
        }

        // Mapear os dados dos atores
        let atoresComNacionalidades = await Promise.all(dadosAtores.map(async (ator) => {
            // Buscar as nacionalidades do ator
            let nacionalidades = await nacionalidadeDAO.getNacionalidadeByNomeAtor(ator.nome)

            // Retornar o ator com as nacionalidades
            return {
                ...ator,
                nacionalidades: nacionalidades.map(nacionalidade => nacionalidade.nome)
            }
        }))

        return atoresComNacionalidades
    } catch (error) {
        console.error("Erro ao buscar atores e nacionalidades:", error)
        return { message: "Erro ao buscar atores e nacionalidades" }
    }
}



module.exports = {
    getListarAtores
}