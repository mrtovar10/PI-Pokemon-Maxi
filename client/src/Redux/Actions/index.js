import {DISPLAY_POKEMONS, DISPLAY_TYPES} from '../Constantes/constantes.js'






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