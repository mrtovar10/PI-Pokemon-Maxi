import React from 'react'
import {Link} from 'react-router-dom'
import enter from '../../Images/Enter.png'

export default function LandingPage() {
    return (
        <div>
            <h1> Bienvenidos a la Poke App</h1>
            <Link to = '/home'>
                <img src={enter} alt = 'enter' height = '15%' width='15%'/>
            </Link>
        </div>
    )
}