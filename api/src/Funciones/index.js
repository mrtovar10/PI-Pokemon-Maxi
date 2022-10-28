'use strict'

const fetch = require('node-fetch')
const { Pokemon, Tipo } = require('../db.js')

let endPointPrincipal = 'https://pokeapi.co/api/v2/pokemon'


//Funciones que me traeran los datos de la pokeapi
module.exports = {
  
  PromesaInfoApi: function (endPointPrincipal, segundaPagina = false) {
    // recibe un endpoint y un booleano
    // retornamos una promesa que se resuelve a un arreglo de objetos
    // del tipo { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
    // dicho arreglo tiene los primeros 40 pokemons de la api (pagina 1 y 2)

    // A continuacion mi codigo:
    // Segunda Pagina (mi condicion de parada) otros 20 pokemons
    if (segundaPagina) return fetch(endPointPrincipal).then(resp => resp.json())

    else{ // Primera pagina (primeros 20 pokemons)
      return fetch(endPointPrincipal).then(resp => resp.json())
      .then(datos => {
        return this.PromesaInfoApi(datos.next,true).then(
          datos2 => {
            // console.log([...datos.results,...datos2.results])
            return [...datos.results,...datos2.results]
          }
        )
      })
    }
  },

  cacheInfoApi: function (){
    //La idea de esta funcion es generar una clousure para no tenter que pedir 
    // informacion a la API si ya la tengo y asi evitar hacer los subrequest

    let datosCache = null
    return endpoint => { //arrow function para que quede bindeada al objeto del cual se llamo
      console.log('mi cache esta vacio?',datosCache=== null)

      if(datosCache === null) {
        // si datosCache es null pues se pide la informacion a la API
        datosCache = this.PromesaInfoApi(endpoint)
        this.booleano = true
        return datosCache
      }else return datosCache // Sino, se pide la informacion al cache (clousure)
    }
  },

  // para saber si ya se ha ejecutado cacheInfoApi usamos la propiedad guardarFuncion:
  // false no se ha ejecutado. 
  guardarFuncion:false,

  primerosPokemons: function (promesaArreglo) {
    //recibe una promesa similar a la que retorna PromesaInfoApi
    // retorna una promesa que se resuelve a otro arreglo de objetos de la forma:
    // { ID: , Nombre: , Tipos: , imgUrl:, }
    
    return promesaArreglo.then(
      datos =>{
        // recordar que datos es un arreglo del tipo {name:'bulbasaur', url:'http..' }
        // creamos un arreglo de promesas 
        let arregloPromesas = datos.map(value => fetch(value.url)
        .then(valor => valor.json()))

        return Promise.all(arregloPromesas).then(
          // array es el arreglo de las resoluciones de todos los fetch del arreglo inicial (promesaArreglo)
          array => {
            let arrayFinal = array.map(valor => {

              //valor.types es un arreglo, vamos a darle la estructura deseada
              let newTypes = valor.types.map(obj => obj.type.name)

              return {
                ID:valor.id,
                Nombre: valor.forms[0].name,
                Tipos: newTypes,
                imgUrl: valor.sprites.other.dream_world.front_default,
                Ataque: valor.stats[1].base_stat
              }
            })
            // console.log(arrayFinal)
            // console.log(arrayFinal[2].types)
            return arrayFinal
          }
        )
      }
    )

  },

  guardarTipos:async function (){
    // Si los tipos NO estan en la db entonces los guarda en la db
    // Si los tipos ya estan guardados en la db entonces los retorna

    //Consulta la tabla y en caso de que hayan datos los retorna
    // Para comprobar q trae de la API o de la db puedes usar [['Nombre','NombreDB']]
    let types = await Tipo.findAll({attributes:['Nombre']});
    if (types.length) return types

    return fetch('https://pokeapi.co/api/v2/type').then(datos=>datos.json())
    .then(
      // es async ya que para guardar datos en la db se hace de forma asincrona
      async objeto => {
        // En array se guarda arreglo del estilo: [{Nombre:nomal},{Nombre:poison}...]
        let array = objeto.results.map(element => {return {Nombre:element.name}})
        // La linea dentro del try: Guarda los datos en la db y ademas los retorna
        try {
          await Tipo.bulkCreate(array)
          return array
          // arreglo.map(element => {return {Nombre:element.name}})
        } catch (e) {
          throw new Error({error:e.message})
        }
      });
  },

  pokemonsCreados: async function (){
    //Consulta la base de datos y trae los pokemons creados
    // Limpia el arreglo de tipos y retorna Promesa de un arreglo de objetos de la forma:
    // [{name:..., ID:..., Tipos:[tipo1,tipo2...]}, {name..}, {name...}]

    try {
      const pokeDB = await Pokemon.findAll({
        // Esto es como hacer un JOIN 
        include:[
          {
            model:Tipo,
            attributes:[['Nombre','name']],
            through:{ attributes: []}
          }
        ],
        attributes:['ID','Nombre','imgUrl','CreadoPorUsuario','Ataque']
      })
      let datosSucios =  pokeDB.map(value => value.toJSON())
  
      let datosLimpios = datosSucios.map(value => {
        // Voy a limpiar el array de Tipos
        let newTipos = value.Tipos.map(objeto => objeto.name)
  
        //Sustituyo el array de Tipos 'sucio' por el limpio (newTipos)
        return {...value,Tipos:newTipos}
      })
      return datosLimpios;
    } catch (e) {
      throw new Error({error: e.message})
    }
  },

  detallesPokemon: async function(id){
    //Recibe un ID y retorna la promesa q se resuelve a un objeto con los detalles 
    // del pokemon cuyo ID me pasan 
    if(0 < id && id <= 905) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(result => result.json())
        .then(
        pokemon => {
          let newTipos = pokemon.types.map(obj => obj.type.name)
          return {
            ID:pokemon.id,
            Nombre: pokemon.forms[0].name,
            Tipos: newTipos,
            imgUrl: pokemon.sprites.other.dream_world.front_default,
            Vida: pokemon.stats[0].base_stat,
            Ataque: pokemon.stats[1].base_stat,
            Defensa: pokemon.stats[2].base_stat,
            Velocidad: pokemon.stats[5].base_stat,
            Altura:pokemon.height,
            Peso: pokemon.weight 
          }
        })
    }
    else
    {
      try {
        let pokemon = await Pokemon.findAll({
          // Esto es como hacer un JOIN 
          include:[
            {
              model:Tipo,
              attributes:[['Nombre','name']],
              through:{ attributes: []}
            }
          ],
          where:{ID:id}
        })

        if(pokemon) {
          // console.log('pokee',pokemon[0].toJSON())
          let pokeToClean = pokemon[0].toJSON()
          let newTipos = pokeToClean.Tipos.map(objeto => objeto.name)
          return {...pokeToClean,Tipos:newTipos}
        }
        throw new Error('No existe pokemon con ese ID')
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
}