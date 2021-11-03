import express from 'express';
import listendpoints from "express-list-endpoints";
import { connectDB } from "./db/sequelize.js"

//routes
import productsRoutes from "./services/products/products.js"
import reviewsRoutes from "./services/reviews/reviews.js"

const server = express();


//middleware
server.use(express.json())

//endpoints
/
server.use("/products", productsRoutes)

server.use("/reviews", reviewsRoutes)



const port = process.env.PORT

console.table(listendpoints(server))

//starting sequelize at server start
server.listen(port , async () => {
    await connectDB()
})