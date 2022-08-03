import React from 'react';


export default function Pokemon ({name, types, img, id}) {
    return (
        <div key={`poke-${id}`}>
            <img src = {img} alt = 'Pokemon' height = '250px' width='200px'/>
            <h3>{name}</h3>
            {types.map((value,index) => <h5 key={index}>{value}</h5>)}
        </div>
    )
}