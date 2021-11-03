import express from "express";
import models from "../../db/models/index.js"
const { products , reviews } = models


const router = express.Router()


router.route("/")
                .post(async (req, res) => {
                    try {
                        const newReview = await reviews.create(req.body)
                        res.status(201).send({success: true, data: newReview})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        const getAll = await reviews.findAll()
                        res.status(200).send({success: true, data: getAll})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })

router.route("/:reviewsId")
                .put(async (req, res) => {
                    try {
                        const updatedReviews = await reviews.update(req.body, {
                            where: {
                                id: req.params.reviewsId
                            },
                            returning: true
                        })
                        res.status(201).send({success: true, data: updatedReviews})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .delete(async (req, res) => {
                    try {
                        const deleteReview = await reviews.destroy({
                            where: {
                                id: req.params.reviewsId
                            }
                        })
                        res.status(204).send({success: true, message: "Product deleted"})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        const getById = await reviews.findByPk(req.params.reviewsId)
                        res.status(200).send({success: true, data: getById})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })

export default router