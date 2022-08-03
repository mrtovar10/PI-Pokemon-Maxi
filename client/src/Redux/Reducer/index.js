import {DISPLAY_POKEMONS, DISPLAY_TYPES} from '../Constantes/constantes.js'


let initialState = {
    allPokemons: [],
    tipos: [],
    detallePokemon: {}
}

const reducer = function (state = initialState, action) {

    switch (action.type) {
        case DISPLAY_POKEMONS:
            return {...state,
            allPokemons: action.payload}
    
        default:
            return state;
    }
}

export default reducer