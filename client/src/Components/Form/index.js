import React, {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom"
// import './index.css'
import {postPokemon,getPokemons,resetFilters} from '../../Redux/Actions'
import imgdefault from '../../Images/pokeball.png'
import s from './form.module.css'


export default function  Form() {

  // arreglo de todos los tipos con indice coincidente con su id en la Database
  let allTipos = [null,'normal','fighting','flying','poison','ground','rock','bug',
    'ghost','steel','fire','water','grass','electric','psychic',
    'ice','dragon','dark','fairy','unknown','shadow']
  //La funcion validate   
  // recibe el objeto input y retorna un objeto similar 
  //a input (errors) pero notificando los errores
  function validate(input) {
    let errors = {};
    if (!input.Nombre.trim()) {
      errors.Nombre = 'Name is required';
    }
    if (input.Vida) {
      if (!/^[0-9]*$/.test(input.Vida)) errors.Vida = 'Positive integers only';
    }
    if (input.Ataque) {
      if (!/^[0-9]*$/.test(input.Ataque)) errors.Ataque = 'Positive integers only';
    }
    if (input.Defensa) {
      if (!/^[0-9]*$/.test(input.Defensa)) errors.Defensa = 'Positive integers only';
    }
    if (input.Velocidad) {
      if (!/^[0-9]*$/.test(input.Velocidad)) errors.Velocidad = 'Positive integers only';
    }
    if (input.Altura) {
      if (!/^[0-9]*$/.test(input.Altura)) errors.Altura = 'Positive integers only';
    }
    if (input.Peso) {
      if (!/^[0-9]*$/.test(input.Peso)) errors.Peso = 'Positive integers only';
    }
    return errors;
  };

  //Configurando el dispatch
  const dispatch = useDispatch();

  let [booleano, setBooelano] = useState(true)
  const [input, setInput] = useState({
    Nombre: '',
    imgUrl:'',
    Vida: '',
    Ataque:'',
    Defensa:'',
    Velocidad:'',
    Altura:'',
    Peso:'',
    Tipos:[]
  });

  let [valueToArray, setValueToArray] = useState('normal')
  let [array, setArray] = useState([])

  const [errors, setErrors] = useState({})

  useEffect(()=>{
    if(Object.values(errors).length || input.Nombre === '') setBooelano(true)
    else setBooelano(false)
  },[errors])

  function handleInputChange(evento) {
    setInput({
      ...input,
      [evento.target.name]: evento.target.value
    })
    setErrors(
    validate({...input,[evento.target.name]: evento.target.value}))

  }

  function handleSubmit(evento){
    evento.preventDefault();
    // setInput({...input,
    // Tipos:array})
    let arrayID = array.map(value =>{
      return allTipos.indexOf(value)
    })
    let url = /(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpg|jpeg|gif|png|svg)/
    .test(input.imgUrl)? input.imgUrl :
    imgdefault;

    console.log({...input,
      Tipos:arrayID})

    let objeto = {
      ...input,
      imgUrl:url,
      Vida:Number(input.Vida),
      Ataque:Number(input.Ataque),
      Defensa:Number(input.Defensa),
      Velocidad:Number(input.Velocidad),
      Altura:Number(input.Altura),
      Peso:Number(input.Peso),
      Tipos:arrayID
    }
    dispatch(postPokemon(objeto))
    dispatch(getPokemons())
    alert('The pokemon has been created')
      
    setValueToArray('normal')
    handleDeleteArray()
    setInput({
      Nombre: '',
      imgUrl:'',
      Vida: '',
      Ataque:'',
      Defensa:'',
      Velocidad:'',
      Altura:'',
      Peso:'',
      Tipos:[]
    })
    setBooelano(true)
  }

  function handleToArrayTypes(evento){
    setValueToArray(evento.target.value)
  }

  function handleAddToArray() {
    if(array.length < 3) { setArray(array=>{
      return ([...array,valueToArray].filter((item,index)=>{
        return [...array,valueToArray].indexOf(item) === index;
      }))
    })}
  }
  function handleDeleteArray(){
    setArray([])
  }

  function handleClick(){
    dispatch(resetFilters())
  }

  return (
    <div className={s.div}>
      <Link to = '/home'>
        <button className={s.div__boton} type="button" onClick={handleClick}>Back</button>
      </Link>  
      <h1>Create a new Pokemon</h1>
      <br/>
      <form className={s.formulario} onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input className={s.div__search} type="text" name="Nombre" 
          value ={input.Nombre} onChange ={e=>(handleInputChange(e))}/>
          {errors.Nombre && (
        <p>{errors.Nombre}</p>)}
        </div>
        <br/>
        <div>
          <label>Img (URL): </label>
          <input className={s.div__search} type="text" name="imgUrl" 
          value ={input.imgUrl} onChange ={e=>(handleInputChange(e))}/>
        </div>
        <br/>
        <div>
          <label>Health Points: </label>
          <input className={s.div__search} type="number" name="Vida" 
          value ={input.Vida} onChange ={e=>(handleInputChange(e))}/>
                  {errors.Vida && (
        <p>{errors.Vida}</p>)}
        </div>
        <br/>
        <div>
          <label>Attack: </label>
          <input className={s.div__search} type="number" name="Ataque" 
          value ={input.Ataque} onChange ={e=>(handleInputChange(e))}/>
                  {errors.Ataque && (
        <p>{errors.Ataque}</p>)}
        </div>
        <br/>
        <div>
          <label>Defense: </label>
          <input className={s.div__search} type="number" name="Defensa" 
          value ={input.Defensa} onChange ={e=>(handleInputChange(e))}/>
                  {errors.Defensa && (
        <p>{errors.Defensa}</p>)}
        </div>
        <br/>
        <div>
          <label>Speed: </label>
          <input className={s.div__search} type="number" name="Velocidad" 
          value ={input.Velocidad} onChange ={e=>(handleInputChange(e))}/>
                  {errors.Velocidad && (
        <p>{errors.Velocidad}</p>)}
        </div>
        <br/>
        <div>
          <label>Height: </label>
          <input className={s.div__search} type="number" name="Altura" 
          value ={input.Altura} onChange ={e=>(handleInputChange(e))}/>
                  {errors.Altura && (
        <p>{errors.Altura}</p>)}
        </div>
        <br/>
        <div>
          <label>Weight: </label>
          <input className={s.div__search} type="number" name="Peso" 
          value ={input.Peso} onChange ={e=>(handleInputChange(e))}/>
                  {errors.Peso && (
        <p>{errors.Peso}</p>)}
        </div>
        <br/>
        <div>
          <label>Types: </label>
          {/* <input type="text" name="Tipos" 
          value ={valueToArray} onChange ={e=>(handleToArrayTypes(e))}/> */}
          <select className={s.div__sort} value ={valueToArray} onChange={e=>(handleToArrayTypes(e))}>
                    <option value='normal' default> normal </option>
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
          <button className={s.div__boton} type="button" onClick={handleAddToArray}>Add type</button>
          <button className={s.div__boton} type="button" onClick={handleDeleteArray}>Delete types</button>
        </div>
        <ul>
          {array.map(value => {
            return <li className={s[value]} key={value}>{value}</li>
          })}
        </ul>
        <br/>
          <input className={s.div__boton} type="submit" value="Create Pokemon" disabled ={booleano}/>
      </form>
    </div>
  )
}
