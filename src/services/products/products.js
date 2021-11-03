import express from "express";
import models from "../../db/models/index.js"
const { products , reviews } = models


//Imported sequelize and Op to filter by category and name
import sequelize from "sequelize"
const { Op } = sequelize

const router = express.Router()


router.route("/")
                .post(async (req, res) => {
                    try {
                        const newProduct = await products.create(req.body)
                        res.status(201).send({success: true, data: newProduct})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        if(req.query.category || req.query.name){
                            if(req.query.category){
                                const product = await products.findAll({
                                    where: {
                                        category : {
                                            [Op.like]: `%${req.query.category}%`
                                        }
                                    },
                                    include: reviews
                                })
                                
                                res.status(200).send({success: true, data: product})
                            } else {
                                const product = await products.findAll({
                                    where: {
                                        name : {
                                            [Op.like]: `%${req.query.name}%`
                                        }
                                    },
                                    include: reviews
                                })
                                
                                res.status(200).send({success: true, data: product})
                            }
                        } if(req.query.price) {
                            const getAllByPrice = await products.findAll({
                                where:{
                                    price: req.query.price
                                },
                                include: reviews
                            })
                            res.status(200).send({success: true, data: getAllByPrice})
                        } else {
                            const getAllByPrice = await products.findAll({include: reviews})
                            res.status(200).send({success: true, data: getAllByPrice})
                        }
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })

router.route("/:productId")
                .put(async (req, res) => {
                    try {
                        const updatedProduct = await products.update(req.body, {
                            where: {
                                id: req.params.productId
                            },
                            returning: true
                        })
                        res.status(201).send({success: true, data: updatedProduct})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .delete(async (req, res) => {
                    try {
                        const deleteProduct = await products.destroy({
                            where: {
                                id: req.params.productId
                            }
                        })
                        res.status(204).send({success: true, message: "Product deleted"})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        const getById = await products.findByPk(req.params.productId)
                        res.status(200).send({success: true, data: getById})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })

export default router