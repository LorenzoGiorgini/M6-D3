import sequelize from "../sequelize.js"
import s from "sequelize"
const { DataTypes } = s


const Reviews = sequelize.define('reviews', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default Reviews