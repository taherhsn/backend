import { UserModel } from "../Postgres/Db.js";



export const LoginUser = async (req, res) => {
  const { Nom_U, Password_U } = req.body;
  
  try {
    const user = await UserModel.findOne({ where: { Nom_U } });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.Password_U !== Password_U) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.ID_U,
        name: user.Nom_U,
        email: user.Email,
        role: user.Role_Defaut
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": "internal server error" });
  }
};