import { Sequelize,DataTypes } from "sequelize" 
// import { CreatProjectM } from "./ProjectModel"
// import { CreateEntrepriseM } from "./EntrepriseModel"


export const createAttM = async (sequelize)=>{

    const Attribution = sequelize.define("Attribution",{
  ID_Att: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Date_Att: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
   
    Contrat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}) ;
return Attribution ; 


}