import React from "react";
import s from './paginado.module.css'

export default function Paginado ({pokePorPag, nPokemons, irAPagina}) {
    let arreglo = []; // arreglo que me va a guardar los numeritos del paginado


    // nPokemons = 40 de la api + X de la DataBase
    //pokePorPag = 12
    for (let i = 1; i <= Math.ceil(nPokemons / pokePorPag); i++) {
        arreglo.push(i)
    }
    
    return (
        <nav>
            <ul className={s.paginado}>
                {arreglo?.map(numero => {
                    return (
                    <li onClick={()=>irAPagina(numero)} className={s.number} key={numero}>
                        <h5>{numero}</h5>
                    </li>
                    )
                })}
            </ul>
        </nav>
    )
}