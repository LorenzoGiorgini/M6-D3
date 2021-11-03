import products from "./products.js"
import reviews from "./reviews.js"

products.hasMany(reviews, { onDelete: "CASCADE" })
reviews.belongsTo(products, { onDelete: "CASCADE" })



export default { products , reviews }