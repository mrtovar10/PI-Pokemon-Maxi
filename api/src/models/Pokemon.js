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
    Nombre:{
      type:DataTypes.STRING,
      allowNull:false
    },
    Vida:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)},
    },
    Ataque:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)}
    },
    Defensa:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)}
    },
    Velocidad:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)}
    },
    Altura:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)}
    },
    Peso:{
      type:DataTypes.INTEGER,
      positivo(value) {esPositivo(value)}
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
