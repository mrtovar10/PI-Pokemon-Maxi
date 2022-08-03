import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons} from '../../Redux/Actions/index.js'
import {Link} from 'react-router-dom'
import Pokemon from '../Pokemon/pokemon.js'
import Paginado from '../Paginado/index.js';
export default function Home () {
    //Hacemos la conexion con el store global de redux
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.allPokemons);
    const [pagActual, setPagActual] = useState(1)
    const [pokePorPag] = useState(12)
    const indicePrimerPokePagSig = pagActual * pokePorPag
    const indicePrimerPokePagAct = indicePrimerPokePagSig - pokePorPag

    const pokesEnPantalla = allPokemons?.slice(indicePrimerPokePagAct,indicePrimerPokePagSig)

    const irAPagina = function(pag) {
        setPagActual(pag)
    }

    //Component did mount
    useEffect (()=>{
        if(!allPokemons.length) dispatch(getPokemons())
    },[])

    function handleClick(evento) {
        // evento.preventDefault()
        // dispatch(getPokemons())
    }

    return (
        <>
            <Link to = '/'>
            <button> Landing </button>
            </Link>
            <Link to = '/createpokemon'>
            <button> 
                Create Pokemon
            </button>
            </Link>
            <button onClick={e => handleClick(e)}> 
                Reload
            </button>
            <div>
                <select value ='alfabetico'>
                    <option value='' default> Sort </option>
                    <option value='asc'> Ascending </option>
                    <option value='desc'> Descending </option>
                </select>
                <select value ='ataque'>
                    <option value='' default> Sort by attack </option>
                    <option value='asc'> Highest </option>
                    <option value='desc'> Lowest </option>
                </select>
                <select value ='tipo'>
                    <option value='' default> Type </option>
                    <option value='normal'> normal </option>
                    <option value='fighting'> fighting </option>
                    <option value='flying'> flying </option>
                    <option value='poison'> poison </option>
                    <option value='ground'> ground </option>
                    <option value='rock'> rock </option>
                    <option value='bug'> bug </option>
                    <option value='ghost'> ghost </option>
                    <option value='steel'> steel </option>
                    <option value='fire'> fire </option>
                    <option value='water'> water </option>
                    <option value='grass'> grass </option>
                    <option value='electric'> electric </option>
                    <option value='psychic'> psychic </option>
                    <option value='ice'> ice </option>
                    <option value='dragon'> dragon </option>
                    <option value='dark'> dark </option>
                    <option value='fairy'> fairy </option>
                    <option value='unknown'> unknown </option>
                    <option value='shadow'> shadow </option>
                </select>
                <select value ='creador'>
                    <option value='' default> Create by </option>
                    <option value='asc'> Company </option>
                    <option value='desc'> Users </option>
                </select>
            </div>
            <div>
                {
                    pokesEnPantalla?.map(
                        (value, index) => {
                            return (
                                <Pokemon img={value.imgUrl} 
                                types={value.Tipos} 
                                name= {value.Nombre}
                                id={value.ID}
                                key={index}/>
                            )
                        }
                    )
                }
            </div>
            <div>
                <Paginado pokePorPag={pokePorPag} 
                nPokemons={allPokemons.length} 
                irAPagina={irAPagina}/>
            </div>
        </>
    )
}
    
    
    
    
    
    
    
    
    
    
    
    
