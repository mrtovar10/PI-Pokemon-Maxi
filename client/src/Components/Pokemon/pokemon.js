import React from 'react';
import {Link} from 'react-router-dom'
import s from './pokemon.module.css'

export default function Pokemon ({name, types, img, id}) {
    return (
        <Link to ={`/details/${id}`}>
            <div className={s.div} key={`poke-${id}`}>
                <img className={s.div__img} src = {img} alt = 'Pokemon'/>
                <h3 className={s.div__h3}>{name}</h3>
                <div className={s.div__div}>
                    <h5> types: </h5>
                    {types.map((value,index) => {
                        return <h5 className={s[`${value}`]} key={index}>{value}</h5>
                    })}
                </div>
            </div>
        </Link>
    )
}