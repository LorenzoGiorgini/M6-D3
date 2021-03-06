import sequelize from "../sequelize.js"
import s from "sequelize"
const { DataTypes } = s


const Users = sequelize.define("users",{
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
  
        validate: {
          isEmail: true,
        }
      }
})


export default Users