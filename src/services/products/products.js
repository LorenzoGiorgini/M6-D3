import express from "express";
import models from "../../db/models/index.js"
const { Products , Reviews , Categories , Users , ProductCategory } = models


//Imported sequelize and Op to filter by category and name
import sequelize from "sequelize"
const { Op } = sequelize

const router = express.Router()



const searchByCategoryAndName = async (field , query) => {
    const product = await Products.findAll({
        where: {
            [field] : {
                [Op.like]: `%${query}%`
            }
        },
        include: Reviews
    })
    return product
}


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
                        if(req.query.category) {
                            const product = await searchByCategoryAndName("category", req.query.category)
                            
                            res.status(200).send({success: true, data: product})
                        } 
                        if(req.query.name) {
                            const product = await searchByCategoryAndName("name" , req.query.name)
                            
                            res.status(200).send({success: true, data: product})
                        }
                        if(req.query.price) {
                            const getAllByPrice = await Products.findAll({
                                where:{
                                    price: req.query.price
                                },
                                include: Reviews
                            })
                            res.status(200).send({success: true, data: getAllByPrice})
                        }
                            const getAllProducts = await Products.findAll({
                                include: [{ model: Categories, through: { attributes: [] } }, Reviews],
                                order: [["createdAt", "ASC"]],
                            })
                            res.status(200).send({success: true, data: getAllProducts})
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