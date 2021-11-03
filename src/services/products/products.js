import express from "express";
import models from "../../db/models/index.js"
const { products , reviews } = models


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
                        const getAll = await products.findAll({include: reviews})
                        res.status(200).send({success: true, data: getAll})
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