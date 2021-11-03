import express from 'express';
import listendpoints from "express-list-endpoints";

const server = express();

server.use(express.json())


/* 
server.use("/products")

server.use("/reviews")
*/


const port = process.env.PORT

console.table(listendpoints(server))

server.listen(port)