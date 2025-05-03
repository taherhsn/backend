import { DataTypes } from "sequelize";

export const createAdministrateurModel = async (sequelize) => {
  const Administrateur = sequelize.define('Administrateur', {
    
    ID_U: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'ID_U'
      }
    }
  });
  
  return Administrateur;
};