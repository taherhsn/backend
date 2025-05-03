import { DataTypes } from "sequelize";

export const createResponsableModel = async (sequelize) => {
  const Responsable = sequelize.define('Responsable', {
   
    
    ID_U: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'ID_U'
      }
    }
  });
  
  return Responsable;
};