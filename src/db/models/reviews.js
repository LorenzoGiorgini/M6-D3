import sequelize from "../sequelize.js"
import s from "sequelize"
const { DataTypes } = s


const reviews = sequelize.define('reviews', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
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


export default reviews