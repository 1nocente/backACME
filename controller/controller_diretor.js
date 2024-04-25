//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const diretoresDAO = require('../model/DAO/diretor.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')
const sexoDAO = require('../model/DAO/sexo.js')

const getListarDiretores = async function () {
    try {
        // Chama a função do DAO que retorna atores do BD
        let dadosDiretores = await diretoresDAO.selectAllDiretores()

        // Validar se há dados de atores
        if (!dadosDiretores) {
            return { message: "Nenhum ator encontrado" }
        }

        // Mapear os dados dos atores
        let diretoresComNacionalidades = await Promise.all(dadosDiretores.map(async (ator) => {
            // Buscar as nacionalidades do ator
            let nacionalidades = await nacionalidadeDAO.getNacionalidadeByNomeDiretor(ator.nome)

            // Retornar o ator com as nacionalidades
            return {
                ...ator,
                nacionalidades: nacionalidades.map(nacionalidade => nacionalidade.nome)
            }
        }))

        return diretoresComNacionalidades
    } catch (error) {
        console.error("Erro ao buscar atores e nacionalidades:", error)
        return { message: "Erro ao buscar atores e nacionalidades" }
    }
}

const setInserirDiretor = async(dadosBody, contentType) => {
    try {
        let classificacaoJSON = {}
        let arrayNacs = dadosBody.nacionalidade

        console.log(dadosBody);
        if(String(contentType).toLowerCase() == 'application/json'){

            if(dadosBody.nome == null || dadosBody.nome == undefined || dadosBody.nome == '' || dadosBody.nome.length > 100 ||
            dadosBody.data_nascimento == null || dadosBody.data_nascimento == undefined || dadosBody.data_nascimento == '' || dadosBody.data_nascimento.length != 10
            ){
                return message.ERROR_REQUIRED_FIELDS

            }else{
                let validateStatus =  false
                if(dadosBody.biografia != null || dadosBody.biografia != undefined || dadosBody.biografia != ''){
                    if(dadosBody.biografia == null || dadosBody.biografia == undefined || dadosBody.biografia == '' || dadosBody.biografia.length > 655000 ){
                        return message.ERROR_REQUIRED_FIELDS
                    }else{
                        validateStatus = true
                    }
                }else{
                    validateStatus = true
                }
                if(validateStatus){
                    let newDiretor = await diretoresDAO.insertDiretor(dadosBody)
                    let lastId = await diretoresDAO.selectLastIdDiretor()

                    console.log(arrayNacs);

                   
                    if(newDiretor){
                        for (let index = 0; index < arrayNacs.length; index++) {
                            const element = arrayNacs[index];
                            let nacionalidade = await nacionalidadeDAO.insertDiretorNacionalidade(lastId[0].id, element)
                            console.log(nacionalidade);
                        }
                        let nasci = await nacionalidadeDAO.getNacionalidadeByIdDiretor(lastId[0].id)
                        dadosBody.nacionalidade = nasci
                        let sexo = await sexoDAO.getSexoByIdDiretor(dadosBody.id_sexo)
                        dadosBody.id = lastId[0].id
                        delete dadosBody.id_sexo
                        dadosBody.sexo = sexo

                        classificacaoJSON.classificacao = dadosBody
                        classificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
                        classificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        classificacaoJSON.message = message.SUCCESS_CREATED_ITEM.message

                        return classificacaoJSON

                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }

        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarDiretor = async(id, dadosBody, contentType) => {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            let idDiretor = id
            let arrayNacs= dadosBody.nacionalidade
            let diretorJSON = {}

            if (idDiretor == '' || idDiretor == undefined || idDiretor == null || isNaN(idDiretor)){
                return message.ERROR_INVALID_ID
            }else{
                if (dadosBody.nome == null || dadosBody.nome == undefined || dadosBody.nome == '' || dadosBody.nome.length > 100 ||
                dadosBody.data_nascimento == null || dadosBody.data_nascimento == undefined || dadosBody.data_nascimento == '' || dadosBody.data_nascimento.length != 10 ||
                // dadosBody.nacionalidade ==  null || dadosBody.nacionalidade == undefined || dadosBody.nacionalidade != Object ||
                dadosBody.id_sexo == '' || dadosBody.id_sexo == undefined || dadosBody.id_sexo == null || isNaN(dadosBody.id_sexo)) {
                    return message.ERROR_REQUIRED_FIELDS
                } else {
                    let validateStatus =  false
                    if(dadosBody.biografia != null || dadosBody.biografia != undefined || dadosBody.biografia != ''){
                        if(dadosBody.biografia == null || dadosBody.biografia == undefined || dadosBody.biografia == '' || dadosBody.biografia.length > 655000 ){
                        return message.ERROR_REQUIRED_FIELDS
                    }else{
                        validateStatus = true
                    }
                }else{
                    validateStatus = true
                }
                    if (validateStatus) {
                        let verifyId = await diretoresDAO.selectDiretorById(idDiretor)
                        if(verifyId){
                            dadosBody.id = idDiretor
                            let att = await diretoresDAO.updateDiretor(idDiretor, dadosBody)
                            let getDiretor = await diretoresDAO.insertDiretor(idDiretor)
                            if (att) {
                                let ator_ant = await nacionalidadeDAO.selectNacionalidadeByAtor2(idDiretor)
                                    if (diretor_ant) {
                                        console.log(diretor_ant);
                                        for (let index = 0; index < ator_ant.length; index++) {
                                            const element = diretor_ant[index];
                                            let nacionalidade = await nacionalidadeDAO.updateDiretorNacionalidade(element.id, idAtor, arrayNacs[index])
                                            console.log(nacionalidade);
                                        }
                                    }else{
                                        return message.ERROR_INTERNAL_SERVER_DB
                                }
                                let dadosUpdate = getDiretor[0]
                                let nasci = await nacionalidadeDAO.selectNacionalidadeByDiretor(getDiretor[0].id)
                                dadosUpdate.nacionalidade = nasci
                                let sexo = await sexoDAO.getSexoByIdDiretor(getDiretor[0].id_sexo)
                                delete dadosUpdate.id_sexo
                                dadosUpdate.sexo = sexo
                                diretorJSON.diretor = dadosUpdate
                                diretorJSON.status = message.SUCCESS_CREATED_ITEM.status
                                diretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                                diretorJSON.message = message.SUCCESS_CREATED_ITEM.message

                                return diretorJSON
                                } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }

                        }else{
                            return message.ERROR_NOT_FOUND
                        }
                    }
                }
            }
        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE
        }
        
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}
const setExcluirDiretor = async function (id) {

    try {

        let idDiretor = id

        if (idDiretor == "" || idDiretor == undefined || isNaN(idDiretor)) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            return message.ERROR_INVALID_ID
        } else {

            let filmeDiretorDeletada = await diretoresDAO.deleteFilmeDiretor(idDiretor)

            let nacionalidadeDiretorDeletada = await diretoresDAO.deleteNacionalidadeDiretor(idDiretor)

            let diretorDeletado = await diretoresDAO.deleteDiretor(idDiretor)
            console.log(diretorDeletado);
            
            if (nacionalidadeDiretorDeletada && filmeDiretorDeletada && diretorDeletado ) {
                return message.SUCCESS_CREATED_ITEM 

            } else {
                return message.SUCCESS_CREATED_ITEM
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER 
    }

}

const getBuscarDiretor = async(id) => {
    try {
        let idDiretor = id
        if(idDiretor == undefined || idDiretor == '' || idDiretor == null || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID
        }else{
            let diretorJSON = {}

            let dadosDiretor = await diretoresDAO.selectDiretorById(idDiretor)
            if(dadosDiretor){
                console.log(dadosDiretor)

                let nasci = await nacionalidadeDAO.getNacionalidadeByIdDiretor(idDiretor)
                dadosDiretor[0].nacionalidade = nasci
                let sexo = await sexoDAO.getSexoByIdDiretor(dadosDiretor[0].id_sexo)
                console.log(dadosDiretor.id_sexo);
                delete dadosDiretor[0].id_sexo
                dadosDiretor[0].sexo = sexo
                console.log(dadosDiretor)
                diretorJSON.ator = dadosDiretor
                diretorJSON.status = 200

                return diretorJSON
            }else{
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


module.exports = {
    getListarDiretores,
    setInserirDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getBuscarDiretor


}