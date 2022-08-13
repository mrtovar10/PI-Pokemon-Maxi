import React from 'react'
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
// import enter from '../../Images/Enter.png'
import { resetFilters } from '../../Redux/Actions'
import s from './landing.module.css'
import miRuta from '../../Images/Arepa1.jpg'
export default function LandingPage() {
  const dispatch = useDispatch()
  
    function handleClick (){
      dispatch(resetFilters())
    }
    return (
          <>
            <div className={s.div}>
                <h1 className={s.div__h1}> Welcome to the Pokeapi </h1>
                {/* <Link to = '/home'>
                    <img src={enter} alt = 'enter' height = '15%' width='15%'/>
                </Link> */}
                <Link to = '/home'>
                  <button className={s.div__boton} type="button" onClick={handleClick}> Enter </button>
                </Link> 
            </div>
            <div className={s.div__ff}>
                <img width='40%' height='auto' src={miRuta}/>
            </div>
          </>
    )
}