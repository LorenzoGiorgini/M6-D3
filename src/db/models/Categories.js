import sequelize from "../sequelize.js"
import s from "sequelize"
const { DataTypes } = s



const Categories = sequelize.define("categories" , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    timestamps: false
})

export default Categories