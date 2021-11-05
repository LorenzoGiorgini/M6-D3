import Products from "./Porducts.js"
import Reviews from "./Reviews.js"
import Users from "./Users.js"
import Categories from "./Categories.js"
import ProductCategory from "./ProductCategory.js"
import Shopping_cart from "./Shopping_cart.js"

//relation between products and reviews as one to many so one product can have many reviews 

Products.hasMany(Reviews, { onDelete: "CASCADE" })

Reviews.belongsTo(Products, { onDelete: "CASCADE" })


Products.hasMany(Shopping_cart , { onDelete: "CASCADE" })

Shopping_cart.belongsTo(Products , { onDelete: "CASCADE" })


//relation between Users and Reviews as one to many one user can post multiple reviews on the products

Users.hasMany(Reviews, { onDelete: "CASCADE" })

Reviews.belongsTo(Users, { onDelete: "CASCADE" })


//relation between Categories and Products is many to many cause a product can be in many categories

Products.belongsToMany(Categories, {
    through: { 
        model: ProductCategory, unique: false 
    }
})

Categories.belongsToMany(Products, {
    through: { 
        model: ProductCategory, unique: false 
    }
})

export default { Products , Reviews, Categories, Users, ProductCategory, Shopping_cart }