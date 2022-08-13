import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons, filterByCreator, 
        filterByTipo, sortByName,sortByAttack, resetFilters
    } from '../../Redux/Actions/index.js'
import {Link} from 'react-router-dom'
import Pokemon from '../Pokemon/pokemon.js'
import Paginado from '../Paginado/index.js';
import SearchBar from '../SearchBar/index.js';
import s from './home.module.css'

export default function Home () {
    //Hacemos la conexion con el store global de redux
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.allPokemons);

    // constantes para el paginado
    const [pagActual, setPagActual] = useState(1)
    const [pokePorPag] = useState(12)
    const indicePrimerPokePagSig = pagActual * pokePorPag
    const indicePrimerPokePagAct = indicePrimerPokePagSig - pokePorPag
    const pokesEnPantalla = allPokemons.length > 1? allPokemons.slice(indicePrimerPokePagAct,indicePrimerPokePagSig):
                            allPokemons

    const irAPagina = function(pag) {
        setPagActual(pag)
    }


    // constantes para la seleccion del tipo de filtrado
    const [alfabetico, setAlfabetico] = useState('all')
    const [ataque, setAtaque] = useState('all')
    const [tipo, setTipo] = useState('all')
    const [creador, setCreador] = useState('all')
    const [prevtargetVCreador, setPrevtargetVCreador] = useState('all')
    const [prevtargetVTipo, setPrevtargetVTipo] = useState('all')

    const resetAlfabetico = () => setAlfabetico('all')
    const resetAtaque = () => setAtaque('all')
    const resetTipo = () => setTipo('all')
    const resetCreador = () => setCreador('all')


    //Component did mount
    useEffect (()=>{
        if(!allPokemons.length) dispatch(getPokemons())
    },[])

    function handleReset(evento) {
        evento.preventDefault()
        resetAlfabetico();
        resetAtaque();
        resetTipo();
        resetCreador();
        dispatch(resetFilters())
        irAPagina(1)
    }

    function handleCreador(evento) {
        dispatch(filterByCreator('all')) // reestablece el filtro
        setCreador(evento.target.value) // coloca la opcion en el desplegable
        setAlfabetico('all') // coloca la opcion all en desplegable de ordenamiento
        setAtaque('all') // coloca la opcion all en desplegable de ordenamineto
        dispatch(filterByTipo(prevtargetVTipo))  // filtra por tipo en caso de q haya.

        // filtra por creador solo si no es 'all' el evento.target.value
        if(evento.target.value !== 'all') dispatch(filterByCreator(evento.target.value)) 

        setPrevtargetVCreador(evento.target.value) // guarda el target
        irAPagina(1) // va a la pagina 1 siempre
    }

    function handleTipo(evento) {
        dispatch(filterByTipo('all')) // reestablece el filtro
        setAlfabetico('all') // coloca la opcion all en desplegable de ordenamiento
        setAtaque('all') // coloca la opcion all en desplegable de ordenamineto
        setTipo(evento.target.value) // coloca la opcion en el desplegable
        dispatch(filterByCreator(prevtargetVCreador))  // filtra por creador en caso de q haya.

        // filtra por Tipo solo si no es 'all' el evento.target.value
        if(evento.target.value !== 'all') dispatch(filterByTipo(evento.target.value))

        setPrevtargetVTipo(evento.target.value) // guarda el target
        irAPagina(1) // va a la pagina 1 siempre
    }

    function handleSort(evento){
        setAlfabetico(evento.target.value)
        setAtaque('all') // coloca la opcion all en desplegable de ordenamineto
        dispatch(sortByName(evento.target.value))
        irAPagina(1)
    }

    function handleAttack(evento){
        setAtaque(evento.target.value)
        setAlfabetico('all') // coloca la opcion all en desplegable de ordenamiento
        dispatch(sortByAttack(evento.target.value))
        irAPagina(1)
    }


    return (
        <>
            <div className={s.divUno}>
                <Link to = '/'>
                <button className={s.div__boton}> Landing </button>
                </Link>
                <Link to = '/createpokemon'>
                <button className={s.div__boton}> 
                    Create Pokemon
                </button>
                </Link>
                <button className={s.div__boton} onClick={e => handleReset(e)}> 
                    Restore
                </button>
                <SearchBar></SearchBar>
            </div>
            <div className={s.divDos}>
                <select className={s.div__sort} value ={alfabetico} onChange = {e => handleSort(e)}>
                    <option value='all' default> Sort </option>
                    <option value='asc'> Ascending </option>
                    <option value='desc'> Descending </option>
                </select>
                <select className={s.div__sort} value ={ataque} onChange = {e => handleAttack(e)}>
                    <option value='all' default> Sort by attack </option>
                    <option value='asc'> Lowest </option>
                    <option value='desc'> Highest </option>
                </select>
                <select className={s.div__sort} value ={tipo} onChange={e=>handleTipo(e)}>
                    <option value='all' default> Type </option>
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
                <select className={s.div__sort}  value ={creador} onChange={e=>handleCreador(e)}>
                    <option value='all' default> Create by </option>
                    <option value='Company'> Company </option>
                    <option value='CreadoPorUsuario'> Users </option>
                </select>
            </div>
            <Paginado pokePorPag={pokePorPag} 
            nPokemons={allPokemons.length} 
            irAPagina={irAPagina}/>
            <div className={s.div__pokes}>
                {
                    pokesEnPantalla.length > 0 ? pokesEnPantalla.map(
                        (value, index) => {
                            return (
                                <Pokemon img={value.imgUrl} 
                                types={value.Tipos} 
                                name= {value.Nombre}
                                id={value.ID}
                                key={index}/>
                            )
                        }
                    ): <p>Pokemons not found</p>
                }
            </div>
            <Paginado pokePorPag={pokePorPag} 
            nPokemons={allPokemons.length} 
            irAPagina={irAPagina}/>
        </>
    )
}
    
    
    
    
    
    
    
    
    
    
    
    
