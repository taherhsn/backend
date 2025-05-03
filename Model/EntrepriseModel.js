import { Sequelize ,DataTypes} from "sequelize"


export const CreateEntrepriseM =async (sequelize)=>{
    const Entreprise =sequelize.define( 'Entreprise',{
        ID_E: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nom_E: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Point: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    Classement: {
      type: DataTypes.INTEGER
    },
    // Somme_T: {
    //   type: DataTypes.FLOAT,
    //   defaultValue: 0
    // },
    N_Telephone: {
      type: DataTypes.STRING
    },
    Email: {
      type: DataTypes.STRING,
      allowNull :false 
    }
    } ) ;
    return Entreprise ; 
} 
   