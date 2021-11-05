import sequelize from "../sequelize.js"
import s from "sequelize"
const { DataTypes } = s

const Shopping_cart = sequelize.define("Shopping_cart", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
})


export default Shopping_cart