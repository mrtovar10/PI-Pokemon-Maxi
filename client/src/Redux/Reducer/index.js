import {DISPLAY_POKEMONS, FILTER_BY_CREATOR, 
        FILTER_BY_TIPO,SORT_BY_ATTACK,SORT_BY_NAME,
        RESET_FILTERS,POST_POKEMON, SEARCH_POKEMON, SEARCH_POKEMON_FRONT, POKEMON_DETAILS
    } from '../Constantes/constantes.js'


let initialState = {
    allPokemons: [],
    copiaAllPokemons: [],
    allPokemonsBackup: [], // me guarda un respaldo inicial
    tipos: [],
    detallePokemon: {},
    detalles:{}
  }

const reducer = function (state = initialState, action) {

  switch (action.type) {
      case DISPLAY_POKEMONS:
          return {...state,
          allPokemons: action.payload,
          allPokemonsBackup:action.payload, // me guarda un respaldo inicial
          copiaAllPokemons: action.payload
      }

      case FILTER_BY_CREATOR:
          let filtrados = [];
              // par de ternarios anidados que me guardan en la variable filtrados el 
              // arreglo filtrado que quiero mostrar
              filtrados = action.payload === 'all'? state.allPokemonsBackup :
              action.payload === 'CreadoPorUsuario'?
              state.allPokemons.filter(value => value.hasOwnProperty('CreadoPorUsuario')):
              state.allPokemons.filter(value => !value.hasOwnProperty('CreadoPorUsuario'))

          return {
              ...state,
              allPokemons:filtrados,
              copiaAllPokemons:filtrados
          }
      case FILTER_BY_TIPO:
          let filtradosTipo = [];
              // par de ternarios anidados que me guardan en la variable filtradosTipo el 
              // arreglo filtrado que quiero mostrar
              filtradosTipo = action.payload === 'all'? state.allPokemonsBackup :
              state.allPokemons.filter(value => value.Tipos?.includes(action.payload))

          return {
              ...state,
              allPokemons:filtradosTipo,
              copiaAllPokemons:filtradosTipo
          }

      case SORT_BY_NAME:
          let array = [...state.allPokemons]
          if(action.payload === 'asc') {
              array.sort((a,b)=>{
                  if (a.Nombre.toLowerCase() > b.Nombre.toLowerCase()) return 1
                  if (a.Nombre.toLowerCase() < b.Nombre.toLowerCase()) return -1
                  else return 0
              })
          }
          if(action.payload === 'desc') {
              array.sort((a,b)=>{
                  if (a.Nombre.toLowerCase() > b.Nombre.toLowerCase()) return -1
                  if (a.Nombre.toLowerCase() < b.Nombre.toLowerCase()) return 1
                  else return 0
              })
          }
          if(action.payload === 'all') array = state.copiaAllPokemons;
          return {
              ...state, 
              allPokemons:array,
          }

      case SORT_BY_ATTACK:
          let arraAttack = [...state.allPokemons]
          if(action.payload === 'asc') {
              arraAttack.sort((a,b)=>{
                  if (a.Ataque > b.Ataque) return 1
                  if (a.Ataque < b.Ataque) return -1
                  else return 0
              })
          }
          if(action.payload === 'desc') {
              arraAttack.sort((a,b)=>{
                  if (a.Ataque > b.Ataque) return -1
                  if (a.Ataque < b.Ataque) return 1
                  else return 0
              })
          }
          if(action.payload === 'all') arraAttack = state.copiaAllPokemons;
          return {
              ...state, 
              allPokemons:arraAttack,
          }
          
      case RESET_FILTERS:
          return {
              ...state,
              allPokemons:state.allPokemonsBackup
          }

      case POST_POKEMON:
          return {
              ...state
          }
      
      case SEARCH_POKEMON:
        return {
          ...state,
          allPokemons: action.payload
        }
      
      case SEARCH_POKEMON_FRONT:
        const searchT = state.allPokemons.filter(el => el.Nombre.toLowerCase() === action.payload.toLowerCase())
        return {
          ...state,
          allPokemons: searchT
        }

			case POKEMON_DETAILS:
				return {
					...state, detalles:action.payload
				}
				
      default:

      return state;
  }
}

export default reducer