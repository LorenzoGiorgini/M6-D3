import express from 'express';
import listendpoints from "express-list-endpoints";
import { connectDB } from "./db/sequelize.js"

const server = express();


//middleware
server.use(express.json())

//endpoints
/* 
server.use("/products")

server.use("/reviews")
*/


const port = process.env.PORT

console.table(listendpoints(server))

//starting sequelize at server start
server.listen(port , async () => {
    await connectDB()
})