//basic imports 
import express from 'express';
import listendpoints from "express-list-endpoints";
import { connectDB } from "./db/sequelize.js"

//routes
import usersRoutes from "./services/users/users.js"
import productsRoutes from "./services/products/products.js"
import reviewsRoutes from "./services/reviews/reviews.js"
import categoriesRoutes from "./services/categories/categories.js"


const server = express();


//middleware
server.use(express.json())

//endpoints middleware

server.use("/users", usersRoutes)

server.use("/products", productsRoutes)

server.use("/reviews", reviewsRoutes)

server.use("/categories" , categoriesRoutes)

//errorHandlers middleware

//should go here

const port = process.env.PORT

console.table(listendpoints(server))

//starting sequelize at server start
server.listen(port , async () => {
    await connectDB()
})