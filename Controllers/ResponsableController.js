import { ProjectModel, EntrepriseModel,AttributionModel } from "../Postgres/Db.js";

// Project Management
export const AddProject = async (req, res) => {
  try {
    const { Nom_P, Type , Duree, Estimation, Description, Consistance } = req.body;
    
    const existingProject = await ProjectModel.findOne({ where: { Nom_P } })
    if (existingProject) {
      return res.status(409).json({ error: "Project with this name already exists" })
    }

     await ProjectModel.create({ 
      Nom_P,
      Type,
      Duree,
      Estimation,
      Description,
      Consistance
    });
    
    return res.status(201).json({
      message: "Project added successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};

export const getAllProject = async (req, res) => {
    try {
      const projects = await ProjectModel.findAll();
      
      if (projects.length === 0) {
        return res.status(200).json({ message: "No projects found" });
      }
      
      return res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ "error": "internal server error" });
    }
  };

  export const getProjectById = async (req, res) => {
    try {
      const { id } = req.params
  
      const project = await ProjectModel.findByPk(id)
  
      if (!project) {
        return res.status(404).json({ error: "Project not found" })
      }
  
      return res.status(200).json(project)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

export const DeleteProject = async (req, res) => {
  const { id } = req.params;
  
  try {
    const project = await ProjectModel.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    // // Check if project has attributions
    // const attributions = await AttributionModel.findAll({ where: { ID_P: id } })
    // if (attributions.length > 0) {
    //   return res.status(409).json({
    //     error: "Cannot delete project with existing attributions. Remove attributions first.",
    //   })
    // }
    
    await project.destroy();
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};


export const UpdateProject = async (req, res) => {
  const { id } = req.params;
  const { Nom_P, Type, Duree, Estimation, Description, Consistance } = req.body;
  
  try {
    const project = await ProjectModel.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    if (Nom_P) project.Nom_P = Nom_P;
    if(Type) project.Type =Type ;
    if (Duree) project.Duree = Duree;
    if (Estimation) project.Estimation = Estimation;
    if (Description) project.Description = Description;
    if (Consistance) project.Consistance = Consistance;
    
    await project.save();
    return res.status(200).json({
      message: "Project updated successfully",
      project
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};



// Enterprise Management
export const AddEntreprise = async (req, res) => {
  try {
    const { Nom_E, Point, Classement, N_Telephone, Email } = req.body;
    
// Check if enterprise with same name or email already exists
const existingEnterprise = await EntrepriseModel.findOne({
  where:{ Nom_E , Email }
})

if (existingEnterprise) {
  return res.status(409).json({
    error: "Enterprise already exists",
    field: existingEnterprise.Nom_E === Nom_E ? "name" : "email",
  })
}


    await EntrepriseModel.create({
      Nom_E,
      Point,
      Classement,
      Somme_T,
      N_Telephone,
      Email
    });
    
    return res.status(201).json({
      message: "Enterprise added successfully"  });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};

export const getAllEntreprise = async (req,res)=>{
    try {
        const entreprises = await EntrepriseModel.findAll();
        
        if (entreprises.length === 0) {
          return res.status(200).json({ message: "No enterprises found" });
        }
        
        return res.status(200).json(entreprises);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": "internal server error" });
      } 
} ;




export const DeleteEntreprise = async (req, res) => {
  const { id } = req.params;
  
  try {
    const entreprise = await EntrepriseModel.findByPk(id);
    
    if (!entreprise) {
      return res.status(404).json({ error: "Enterprise not found" });
    }
    
    await entreprise.destroy();
    return res.status(200).json({ message: "Enterprise deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};

// Attribution 
export const CreateAttribution = async (req, res) => {
  try {
    const { Contrat } = req.body;
    
    // // Check if project exists
    // const project = await ProjectModel.findByPk(ID_P);
    // if (!project) {
    //   return res.status(404).json({ error: "Project not found" });
    // }
    
    // // Check if enterprise exists
    // const entreprise = await EntrepriseModel.findByPk(ID_E);
    // if (!entreprise) {
    //   return res.status(404).json({ error: "Enterprise not found" });
    // }
    
    const newAttribution = await AttributionModel.create({
      
      Contrat,
      Date_Att: new Date()
    });
    
    return res.status(201).json({
      message: "Attribution created successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};