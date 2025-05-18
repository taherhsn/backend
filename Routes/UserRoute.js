import express from "express";
import { AddUser, getAllUsers,getUserById , DeleteUser,UpdateUserProfil} from "../Controllers/AdminController.js";
import { LoginUser } from "../Controllers/UserController.js";
import { 
  AddProject, DeleteProject, UpdateProject,
  AddEntreprise, DeleteEntreprise,
  getAllProject,getProjectById,
  getAllEntreprise
} from "../Controllers/ResponsableController.js";
import {CreateAttribution ,DeleteAttribution} from "../Controllers/ResponsableController.js"
import { getStats } from "../Controllers/DashbordController.js";

const router = express.Router();

// User routes
router.get("/getAllUsers", getAllUsers);
router.get("/getuserById:id",getUserById); 
router.post("/addUser", AddUser);
router.put("/updatUser/:id", UpdateUserProfil);
router.delete("/DeleteUser/:id", DeleteUser);
router.post("/login", LoginUser);

// Project routes
router.get("/allProjects",getAllProject);
router.get("/getProjectById/:id",getProjectById); 
router.post("/addproject", AddProject);
router.delete("/deleteproject/:id", DeleteProject);
router.put("/updateproject/:id", UpdateProject)


// Enterprise routes
router.get("/allentreprises", getAllEntreprise);
router.post("/addentreprise", AddEntreprise);
router.delete("/deletentreprise/:id", DeleteEntreprise);

// Attribution routes
router.post("/createAttribution", CreateAttribution);
router.delete("/deleteAttribution/:id",DeleteAttribution);

//Dashbord routes 
router.get("/dashboard/stats", getStats); 

export default router;