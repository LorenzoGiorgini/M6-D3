import express from "express";
import models from "../../db/models/index.js"
const { Shopping_cart , Products } = models



const router = express.Router()


router.route("/")
                .post(async (req, res) => {
                    try {

                        const { productId } = req.body

                        const alreadyExist = await Shopping_cart.findAll({
                            where: {
                                productId: productId
                            }
                        })
                    
                        
                        if(alreadyExist.length > 0) {
                        
                            const exist = await Shopping_cart.update({quantity: alreadyExist[0].quantity + 1}, {where: {productId: productId}})

                            res.status(201).send({success: true, data: exist})
                        } else {
                            
                            const dontExists = await Shopping_cart.create({productId: productId, quantity: 1})

                            res.status(201).send({success: true, data: dontExists})
                        }
                    } catch (error) {
                        res.status(500).send({success: false, error: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        const shoppingCart = await Shopping_cart.findAll({include: [{model: Products}]})
                        res.status(200).send({success: true, data: shoppingCart})
                    } catch (error) {
                        res.status(500).send({success: false, error: error.message})
                    }
                })


export default router