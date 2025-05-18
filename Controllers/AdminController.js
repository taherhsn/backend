import { UserModel } from "../Postgres/Db.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["Password_U"] },
    });
    if (users.length === 0) {
      return res.status(201).json({ "error": "users not found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["Password_U"] }, // Don't return the password
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(`Get user by ID error: ${error.message}`)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const AddUser = async (req, res) => {
  const { Nom_U,Password_U, Role_Defaut, Email, Lieu , Numero } = req.body;
  try {
    const userr = await UserModel.findOne({ where: { Nom_U } });
    if (userr == null) {
      await UserModel.create(req.body);
      return res.status(201).json({ message: "user added successfully" });
    }
    return res.status(200).json({ message: "already found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    await user.destroy();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};


export const UpdateUserProfil = async (req, res) => {
  const { Nom_U, Password_U , Email, Lieu, Numero } = req.body;  //delete get Email
  const {id}= req.params ; 
  // let email = req.body.Email;
  
  try {
      const user = await UserModel.findByPk(id);
    // const user = await UserModel.findOne({ where: { Email: email } });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
     
    if (Nom_U && Nom_U !== user.Nom_U) {
      const existingUsername = await UserModel.findOne({ where: { Nom_U } })
      if (existingUsername) {
        return res.status(409).json({ error: "Username already taken" })
      }
    }

    if (Email && Email !== user.Email) {
      const existingEmail = await UserModel.findOne({ where: { Email } })
      if (existingEmail) {
        return res.status(409).json({ error: "Email already taken" })
      }
    }

    if (Numero && Numero !== user.Numero) {
      const existingNumero = await UserModel.findOne({ where: { Numero } })
      if (existingNumero) {
        return res.status(409).json({ error: "Numero already taken" })
      }
    }



    if (Nom_U) { user.Nom_U = Nom_U; }
    if (Password_U) { user.Password_U = Password_U; }
    if (Email) { user.Email = Email; }
    if (Lieu) { user.Lieu = Lieu; }
    if (Numero) { user.Numero = Numero; }
    await user.save();
    return res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "error": "internal server error" });
  }
};