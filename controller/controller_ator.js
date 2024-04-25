//import do arquivo de configuração do projeto
const message = require('../module/config.js')

//import do arquivo responsavel pela interação com o BD (model)
const atoresDAO = require('../model/DAO/ator.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')
const sexoDAO = require('../model/DAO/sexo.js')

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

const setInserirAtor = async(dadosBody, contentType) => {
    try {
        let classificacaoJSON = {}
        let arrayNacs = dadosBody.nacionalidade
        if(String(contentType).toLowerCase() == 'application/json'){

            if(dadosBody.nome == null || dadosBody.nome == undefined || dadosBody.nome == '' || dadosBody.nome.length > 100 ||
            dadosBody.data_nascimento == null || dadosBody.data_nascimento == undefined || dadosBody.data_nascimento == '' || dadosBody.data_nascimento.length != 10
            ){
                return message.ERROR_INVALID_REQUIRED_FIELDS

            }else{
                let validateStatus =  false
                if(dadosBody.biografia != null || dadosBody.biografia != undefined || dadosBody.biografia != ''){
                    if(dadosBody.biografia == null || dadosBody.biografia == undefined || dadosBody.biografia == '' || dadosBody.biografia.length > 655000 ){
                        return message.ERROR_INVALID_REQUIRED_FIELDS
                    }else{
                        validateStatus = true
                    }
                }else{
                    validateStatus = true
                }
                if(validateStatus){
                    let newAtor = await atorDAO.insertAtor(dadosBody)
                    let lastId = await atorDAO.selectLastIdAtor()

                   
                    if(newAtor){
                        for (let index = 0; index < arrayNacs.length; index++) {
                            const element = arrayNacs[index];
                            let nacionalidade = await nacionalidadeDAO.insertAtorNacionalidade(lastId[0].id, element)
                            console.log(nacionalidade);
                        }
                        let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(lastId[0].id)
                        dadosBody.nacionalidade = nasci
                        let sexo = await sexoDAO.selectSexoById(dadosBody.id_sexo)
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
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAtor = async(id, dadosBody, contentType) => {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            let idAtor = id
            let arrayNacs= dadosBody.nacionalidade
            let atorJSON = {}
            if (idAtor == '' || idAtor == undefined || idAtor == null || isNaN(idAtor)){
                return message.ERROR_INVALID_ID
            }else{
                if (dadosBody.nome == null || dadosBody.nome == undefined || dadosBody.nome == '' || dadosBody.nome.length > 100 ||
                dadosBody.data_nascimento == null || dadosBody.data_nascimento == undefined || dadosBody.data_nascimento == '' || dadosBody.data_nascimento.length != 10 ||
                // dadosBody.nacionalidade ==  null || dadosBody.nacionalidade == undefined || dadosBody.nacionalidade != Object ||
                dadosBody.id_sexo == '' || dadosBody.id_sexo == undefined || dadosBody.id_sexo == null || isNaN(dadosBody.id_sexo)) {
                    return message.ERROR_INVALID_REQUIRED_FIELDS
                } else {
                    let validateStatus =  false
                if(dadosBody.biografia != null || dadosBody.biografia != undefined || dadosBody.biografia != ''){
                    if(dadosBody.biografia == null || dadosBody.biografia == undefined || dadosBody.biografia == '' || dadosBody.biografia.length > 655000 ){
                        return message.ERROR_INVALID_REQUIRED_FIELDS
                    }else{
                        validateStatus = true
                    }
                }else{
                    validateStatus = true
                }
                    if (validateStatus) {
                        let verifyId = await atorDAO.selectAtorById(idAtor)
                        let lastId = await atorDAO.selectLastIdAtor()

                        if(verifyId){
                            dadosBody.id = idAtor
                            let att = await atorDAO.updateAtor(idAtor, dadosBody)
                            let getAtor = await atorDAO.selectAtorById(idAtor)
                            if (att) {
                                for (let index = 0; index < arrayNacs.length; index++) {
                                    const elementN = arrayNacs[index];
                                    let ator_ant = await nacionalidadeDAO.selectNacionalidadeByAtorU(idAtor)
                                    if (ator_ant) {
                                        console.log(ator_ant);
                                        for (let index = 0; index < ator_ant.length; index++) {
                                            const element = ator_ant[index];
                                            let nacionalidade = await nacionalidadeDAO.updateAtorNacionalidade(element.id, idAtor, elementN)
                                            console.log();
                                            console.log(nacionalidade);
                                        }
                                    }else{
                                        return message.ERROR_INTERNAL_SERVER_DB
                                    }
                                }
                                let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(lastId[0].id)
                                dadosBody.nacionalidade = nasci
                                let sexo = await sexoDAO.selectSexoById(getAtor[0].id_sexo)
                                dadosBody.id = lastId[0].id
                                delete dadosBody.id_sexo
                                dadosBody.sexo = sexo

                                classificacaoJSON.classificacao = dadosBody
                                classificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
                                classificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                                classificacaoJSON.message = message.SUCCESS_CREATED_ITEM.message

                                return classificacaoJSON
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
        return message.ERROR_INTERNAL_SERVER
    }
}

const setDeletarAtor = async(id) => {
    try {
        let idAtor = id
        if(idAtor == '' || idAtor == null || idAtor == undefined || isNaN(idAtor)){
            return message.ERROR_INVALID_ID
        }else{
            let idVerify = await atoresDAO.selectAtorById(idAtor)

            if(idVerify.length > 0){
                let deletado = await atoresDAO.deleteAtor(idAtor)
     
                if(deletado){
                    return message.SUCCESS_CREATED_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAtor = async(id) => {
    try {
        let idAtor = id
        if(idAtor == undefined || idAtor == '' || idAtor == null || isNaN(idAtor)){
            return message.ERROR_INVALID_ID
        }else{
            let atorJSON = {}

            let dadosAtor = await atoresDAO.selectAtorById(idAtor)
            if(dadosAtor){
                console.log(dadosAtor)

                let nasci = await nacionalidadeDAO.getNacionalidadeByIdAtor(idAtor)
                dadosAtor[0].nacionalidade = nasci
                let sexo = await sexoDAO.getSexoByIdAtor(dadosAtor[0].id_sexo)
                console.log(dadosAtor.id_sexo);
                delete dadosAtor[0].id_sexo
                dadosAtor[0].sexo = sexo
                console.log(dadosAtor)
                atorJSON.ator = dadosAtor
                atorJSON.status = 200

                return atorJSON
            }else{
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


module.exports = {
    getListarAtores,
    setInserirAtor,
    setAtualizarAtor,
    setDeletarAtor,
    getBuscarAtor


}