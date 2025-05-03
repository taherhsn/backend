import { Sequelize } from "sequelize";
import { createUserModel } from "../Model/userModel.js";
import { CreatProjectM } from "../Model/ProjectModel.js";
import { CreateEntrepriseM } from "../Model/EntrepriseModel.js";
import { createAttM } from "../Model/AttributionModel.js";
import { createResponsableModel } from "../Model/ResponsableModel.js";
import { createVisiteurModel } from "../Model/VisiteurModel.js";
import { createAdministrateurModel } from "../Model/AdminModel.js";

const sequelize = new Sequelize('postgres', 'postgres', 'thr543', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

// Initialize models
let UserModel;
let ProjectModel;
let EntrepriseModel;
let AttributionModel;
let ResponsableModel;
let VisiteurModel;
let AdministrateurModel;

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
    
    // Initialize models
    UserModel = await createUserModel(sequelize);
    ProjectModel = await CreatProjectM(sequelize);
    EntrepriseModel = await CreateEntrepriseM(sequelize);
    AttributionModel = await createAttM(sequelize);
    ResponsableModel = await createResponsableModel(sequelize);
    VisiteurModel = await createVisiteurModel(sequelize);
    AdministrateurModel = await createAdministrateurModel(sequelize);
    
  // Define relationships
    // ResponsableModel.hasMany(ProjectModel, { foreignKey: 'responsableId' });
    // ProjectModel.belongsTo(ResponsableModel, { foreignKey: 'responsableId' });
    
    // ResponsableModel.hasMany(EntrepriseModel, { foreignKey: 'responsableId' });
    // EntrepriseModel.belongsTo(ResponsableModel, { foreignKey: 'responsableId' });
    
    // ProjectModel.belongsToMany(EntrepriseModel, { through: AttributionModel, foreignKey: 'ID_P' });
    // EntrepriseModel.belongsToMany(ProjectModel, { through: AttributionModel, foreignKey: 'ID_E' });
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log("Database Synced");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {
  connection,
  UserModel,
  ProjectModel,
  EntrepriseModel,
  AttributionModel,
  ResponsableModel,
  VisiteurModel,
  AdministrateurModel,
  sequelize
};