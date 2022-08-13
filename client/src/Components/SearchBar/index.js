import React, {useState,useEffect} from "react";
import {resetFilters,searchPokemon, searchPokemonFront} from '../../Redux/Actions'
import {useDispatch} from 'react-redux'
import s from './searchBar.module.css'

export default function SearchBar(){

  const dispatch = useDispatch()
  const [texto, setTexto] = useState('') // texto de pokemon a buscar

  useEffect(()=> {
    setTexto('') // el componente se monto, se reseta el texto del searchbar
  },[])

  function handleClick() {
    dispatch(resetFilters());
    // dispatch(searchPokemon(texto)) // descomentar si se quiere buscar desde el Backend
    dispatch(searchPokemonFront(texto))
  }

  function handleTexto(e) {
    setTexto(e.target.value)
  }

  return (
    <>
      <input className={s.div__search} type="text" placeholder="Enter a pokemon name..." value ={texto}
      onChange={handleTexto}>
      </input>
      <button className={s.div__boton} onClick={handleClick}>Search</button>
    </>
  )
}