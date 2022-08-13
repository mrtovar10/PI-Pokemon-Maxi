import {DISPLAY_POKEMONS, 
    FILTER_BY_CREATOR, 
    FILTER_BY_TIPO, 
    SORT_BY_NAME,SORT_BY_ATTACK,
    RESET_FILTERS, POST_POKEMON, 
    SEARCH_POKEMON, SEARCH_POKEMON_FRONT, POKEMON_DETAILS} from '../Constantes/constantes.js'
import axios from 'axios'





// Creamos el Action creator para primerosPokemons el cual me trae el arreglo de
// mis 40 pokemons de la API + los de mi DB
export function getPokemons () {
    return function (dispatch){
        return fetch('http://localhost:3001/pokemons')
        .then(data => data.json())
        .then(
            pokemons => dispatch({type: DISPLAY_POKEMONS,
            payload: pokemons})
        )
    }
}
        
export function postPokemon(objetoPokemon) {
    return async function (dispatch) {
        return axios.post('http://localhost:3001/pokemons',objetoPokemon)
        .then(
            respuesta => dispatch({type:POST_POKEMON, payload:respuesta})
        )
    }
}

export function searchPokemon(texto){
    return function(dispatch) {
        return fetch(`http://localhost:3001/pokemons?name=${texto}`)
        .then(data => data.json())
        .then(respuesta => dispatch({type: SEARCH_POKEMON, payload:respuesta}))
    }
}

export function searchPokemonFront(texto) {
    return {type:SEARCH_POKEMON_FRONT, 
    payload:texto}
}

export function filterByCreator(creator) {
return {
type: FILTER_BY_CREATOR,
payload:creator
}
}

export function filterByTipo(tipo) {
    return {
        type: FILTER_BY_TIPO,
        payload:tipo
    }
}

export function sortByName(tipoDeOrdenamiento) {
    return {
        type: SORT_BY_NAME,
        payload: tipoDeOrdenamiento
    }
}

export function sortByAttack(tipoDeOrdenamiento) {
    return {
        type: SORT_BY_ATTACK,
        payload: tipoDeOrdenamiento
    }
}

export function resetFilters() {
    return {
        type: RESET_FILTERS,
        payload: ''
    }
}

export function montarDetalles(id){
    return function(dispatch) {
        return fetch(`http://localhost:3001/pokemons/${id}`).then(data => data.json())
        .then(objeto => {
            dispatch({type:POKEMON_DETAILS, payload:objeto})
        })
    }
}
