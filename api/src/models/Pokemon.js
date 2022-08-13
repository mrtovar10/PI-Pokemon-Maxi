const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //Importante, tengo una validacion personalizada llamada esPositivo
  //Dicha funcion se encuentra en db.js
  sequelize.define( 'Pokemon',{
    ID:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true
    },
    imgUrl:{
      type:DataTypes.STRING,
      defaultValue:null
    },
    Nombre:{
      type:DataTypes.STRING,
      allowNull:false
    },
    Vida:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)},
      defaultValue:0
    },
    Ataque:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)},
      defaultValue:0
    },
    Defensa:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)},
      defaultValue:0
    },
    Velocidad:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)},
      defaultValue:0
    },
    Altura:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)},
      defaultValue:0
    },
    Peso:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)},
      defaultValue:0
    },
    // Para diferenciar entre pokemons creados por usuario y los pokemons de la api...
    // esta columna basicamente es para saber si el pokemon fue creado por un usuario o no
    CreadoPorUsuario: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
    },
    {timestamps: false}
  )
};
