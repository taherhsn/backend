import { ProjectModel, EntrepriseModel, AttributionModel, UserModel } from "../Postgres/Db.js"
import { Sequelize } from "sequelize"

// Get overall statistics
export const getStats = async (req, res) => {
  try {
    const projectCount = await ProjectModel.count()
    const enterpriseCount = await EntrepriseModel.count()
    const attributionCount = await AttributionModel.count()
    const userCount = await UserModel.count()

    // Get projects by type
    const projectsByType = await ProjectModel.findAll({
      attributes: ["Type", [Sequelize.fn("COUNT", Sequelize.col("ID_P")), "count"]],
      group: ["Type"],
      raw: true,
    })

   
    return res.status(200).json({
      stats: {
        projects: projectCount,
        enterprises: enterpriseCount,
        attributions: attributionCount,
        users: userCount,
      },
      projectsByType,
    
    })
  } catch (error) {
    console.error(`Dashboard stats error: ${error.message}`)
    return res.status(500).json({ error: "Internal server error" })
  }
}
