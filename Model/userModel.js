import { DataTypes,Sequelize} from "sequelize"

//add mail lieu num
export const createUserModel =async (sequelize) =>{
   const User=sequelize.define('User',{
    ID_U: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nom_U: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true 
    },
    Password_U: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Role_Defaut: {
      type: DataTypes.ENUM('responsable', 'administrateur', 'visiteur'),
      defaultValue: 'visiteur' ,
      allowNull: false ,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, },
    Lieu: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    Numero: {
      type: DataTypes.STRING,
      allowNull :false ,
    },

   }) ;
   return User ; 
}
