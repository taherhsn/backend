import { Sequelize,DataTypes } from "sequelize"

export const CreatProjectM =async (sequelize)=>{
  const Project= sequelize.define('Project',{
    ID_P: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nom_P: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type:{
      type: DataTypes.STRING,
      allowNull:false,
      comment:"type de projet",
    },
    
    Duree: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Duration in days",
    },
   Estimation: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Estimated cost",
    },
   Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Consistance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
return Project ;

}