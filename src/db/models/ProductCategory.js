import sequelize from "../sequelize.js"
import s from "sequelize"
const { DataTypes } = s


const ProductCategory = sequelize.define('productCategory', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    }
},{
    timestamps: false
})



export default ProductCategory