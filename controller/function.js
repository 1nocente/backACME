var acmeFilmes = require('../module/filmes.json')

let listaFilmes = acmeFilmes.filmes
const getFilmes = function () {

    let JSONfilmes  = {}
    let arrayFilmes = []

    let status = false

    listaFilmes.forEach( filmes => {

        let filmeJSON = {}

        filmeJSON.id = filmes.id
        filmeJSON.sinopse = filmes.sinopse
        filmeJSON.duracao = filmes.duracao
        filmeJSON.data_lancamento = filmes.data_lancamento

        if(!(filmes.data_relancamento == null))
        filmeJSON.data_relancamento = filmes.data_relancamento

        filmeJSON.foto_capa = filmes.foto_capa
        filmeJSON.valor_unitario = filmes.valor_unitario


        // arrayFilmes.push(filme)
        arrayFilmes.push(filmeJSON)
        status = true
    })

    JSONfilmes.status = status
    JSONfilmes.filmes = arrayFilmes

    return JSONfilmes

}
const getNomeFilmes = function (nomeFilme) {
    let JSONfilme = {}

    let filmeNome = nomeFilme

    let status = false

    listaFilmes.forEach(filme =>{
        let filmeJSON = {}

        if (filmeNome == filme.nome){
            status.true

            filmeJSON.id = filme.id
            filmeJSON.sinopse = filme.sinopse
            filmeJSON.duracao = filme.duracao
            filmeJSON.data_lancamento = filme.data_lancamento

            if(!(filme.data_relancamento == null))
            filmeJSON.data_relancamento = filme.data_relancamento

            filmeJSON.foto_capa = filme.foto_capa
            filmeJSON.valor_unitario = filme.valor_unitario

            JSONfilme.filme = filmeJSON

            JSONfilme.status = status

            return JSONfilme

            
        }
    })
}

const getFilmesId = function (idFilme) {

    let JSONfilme = {}

    let filmeId = idFilme

    let status = false

    listaFilmes.forEach(filme =>{

        let filmeJSON = {}

        if(filmeId == filme.id){
            status = true

            filmeJSON.id = filme.id
            filmeJSON.sinopse = filme.sinopse
            filmeJSON.duracao = filme.duracao
            filmeJSON.data_lancamento = filme.data_lancamento
    
            if(!(filme.data_relancamento == null))
            filmeJSON.data_relancamento = filme.data_relancamento
    
            filmeJSON.foto_capa = filme.foto_capa
            filmeJSON.valor_unitario = filme.valor_unitario

            JSONfilme.filme = filmeJSON
        }
        

    })

    JSONfilme.status = status

    return JSONfilme
}
console.log(getFilmesId(1))

module.exports = {
    getFilmes,
    getFilmesId,
    getNomeFilmes
}