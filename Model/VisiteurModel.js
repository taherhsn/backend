import { DataTypes } from "sequelize";

export const createVisiteurModel = async (sequelize) => {
  const Visiteur = sequelize.define('Visiteur',{
    ID_U: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'ID_U'
      }
    }
  });
  
  return Visiteur;
};