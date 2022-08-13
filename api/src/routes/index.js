const fetch = require('node-fetch');
const { Router } = require('express');
const funciones = require('../Funciones/index.js')
const { Pokemon, Tipo } = require('../db');
const { conn } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Trae los primeros 40 pokemon y tambien los de la database
router.get('/pokemons', async (req,res)=>{
    let endpoint = 'https://pokeapi.co/api/v2/pokemon'
    // let promesa = funciones.PromesaInfoApi(endpoint)
    // No descomentar promesa.then(datos => console.log(datos))
    //  No descomentar console.log('hola')


    // si la funcion guardarFuncion esta en false quiere decir que no se ha
    // hecho ningun pedido a la api, en ese caso se hace el pedido
    // se retornan los datos y ademas se guarda en cache
    if(typeof(funciones.guardarFuncion) != 'function') {
        funciones.guardarFuncion = funciones.cacheInfoApi()}
    

    // guardarFuncion se convierte en la funcion (arrow function) retornada por cacheInfoApi  
    // de este modo se genera la clousure y se le pide los datos al cache en caso de que tenga 
    let promesa = funciones.guardarFuncion(endpoint)
    let {name} = req.query

    // Ejecutamos guardarTipos() para que guarde los tipos de pokes en
    // la database en caso de que aun no esten guardados
    await funciones.guardarTipos()
    
    // TEnemos los 40 pokemons con el formato deseado, (datos40)
    funciones.primerosPokemons(promesa).then(
        datos40 => {
            funciones.pokemonsCreados().then(
                //datosDB es un arreglo similar a datos40 pero de nuestra DB
                datosDB =>{
                    //Concatenamos ambos arreglos
                    let todos = [...datos40,...datosDB]
                    if (name) {
                        let filtrado = todos.filter(
                            value => value.Nombre.toLowerCase() === name.toLowerCase())
                            filtrado.length?
                            res.send(filtrado) :
                            res.status(400).send({error:'No existe ningun pokemon con ese nombre'})
                    }else{
                        res.send(todos)
                    }
                }
            )
        }
    )
})

// GET Types, trae todos los tipos de pokemons existentes desde la api o de la db
router.get('/types', (req, res)=>{
    funciones.guardarTipos().then(
        datos => res.send(datos)
    )
})

//POST  
router.post('/pokemons', async (req, res) => {
    //"Tipos" lo haremos desde el front, será un arreglo de numeros ejemplo [1,2,5]
    // Para poder crear la tabla intermedia que relaciona Tipo con Pokemon
    let {Nombre,imgUrl,Vida,Ataque,Defensa,Velocidad, Altura,Peso,Tipos}
    = req.body;

    try {
        // Ejecutamos guardarTipos() para que guarde los tipos de pokes en
        // la database en caso de que aun no esten guardados
        await funciones.guardarTipos()

       //Insertamos nuestro pokemon creado en la db
     let newPokemon = await Pokemon.create({
         Nombre, Vida, imgUrl, Ataque, Defensa, Velocidad, Altura, Peso
        })
        newPokemon.setTipos(Tipos)
        res.send(newPokemon)
   } catch (e) { 
    res.send({error:e.message})
   }
})

router.get('/pokemons/:id', (req, res) =>{
    let {id} = req.params
    // console.log('id consultada ', id)

    funciones.detallesPokemon(id).then(
        datos => {
            // console.log('resolucion de funcion',datos)
            res.send(datos)}
    ).catch(
        datos => res.status(400).send({error:datos.message})
    )
})

// //Probando
// router.get('/probando', (req, res)=>{
//     funciones.pokemonsCreados()
//     res.send('Listo')
// })
module.exports = router;
