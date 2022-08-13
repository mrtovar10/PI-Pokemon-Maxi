import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {montarDetalles} from '../../Redux/Actions'
import {Link} from 'react-router-dom'
import s from './detail.module.css'

export default function Details () {

  const detalles = useSelector(state => state.detalles)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(()=>{
    dispatch(montarDetalles(params.elID))
  },[])

  return (
    <div className={s.contenedor}>
      <Link to = '/home'>
        <button className={s.div__boton} type="button"> Back </button>
      </Link> 
      <h1>Pokemon details</h1>
      <div className={s.divo}>
        <h2>Name: {detalles.Nombre}</h2>
        <h3>Hp: {detalles.Vida}</h3>
        <h3>Attack: {detalles.Ataque}</h3>
        <h3>Defense: {detalles.Defensa}</h3>
        <h3>Speed: {detalles.Velocidad}</h3>
        <h3>Height: {detalles.Altura}</h3>
        <h3>Weight: {detalles.Peso}</h3>
        <img src = {detalles.imgUrl} alt = 'Pokemon' height = '250px' width='200px'/>
        {detalles.Tipos?.map((value,index) => <h3 className={s[value]} key={index}>{value}</h3>)}
      </div>
    </div>
  )
}