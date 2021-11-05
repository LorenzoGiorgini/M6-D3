import express from "express";
import models from "../../db/models/index.js"
const { Products , Reviews , Categories , ProductCategory } = models


//Imported sequelize and Op to filter by category and name
import sequelize from "sequelize"
const { Op } = sequelize

const router = express.Router()



router.route("/")
                .post(async (req, res) => {
                    try {
                        const newProduct = await Products.create(req.body);
                        
                        await ProductCategory.create({productId: newProduct.id , categoryId: req.body.categoryId})

                        res.status(201).send({success: true, data: newProduct})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        const getAllProducts = await Products.findAndCountAll({
                        include: [{ 
                                model: Categories ,
                                where: { 
                                    ...(req.query.category && {
                                            name: req.query.category
                                        }), 
                                },
                                through: { attributes: [] } 
                            }, Reviews] , 
                            order: [["createdAt", "ASC"]],
                            where: {
                                ...(req.query.price && {
                                    price: req.query.price
                                }), 
                                ...(req.query.name && {
                                    name: {
                                        [Op.iLike]: `%${req.query.name}%`
                                    }
                                }), 
                            },
                        ...(req.query.size && req.query.page && {
                            limit: req.query.size,
                            offset: parseInt(req.query.size * req.query.page),
                        })
                        
                    })
                        res.status(200).send({
                            success: true, 
                            data: getAllProducts,
                            ...(req.query.size && req.query.page && {
                                total: getAllProducts.count,
                                pages: Math.ceil(getAllProducts.count / req.query.size),
                            })
                        })
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })

router.route("/:productId")
                .put(async (req, res) => {
                    try {
                        const updatedProduct = await Products.update(req.body, {
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
                        const deleteProduct = await Products.destroy({
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
                        const getById = await Products.findByPk(req.params.productId)
                        res.status(200).send({success: true, data: getById})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })



export default router