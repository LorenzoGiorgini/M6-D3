import express from "express";
import models from "../../db/models/index.js"
const { Products , Reviews, Users } = models


const router = express.Router()


router.route("/")
                .post(async (req, res) => {
                    try {
                        const newReview = await Reviews.create({
                            text: req.body.text,
                            username: req.body.username,
                            userId: req.body.userId,
                            productId: req.body.productId
                        })

                        res.status(201).send({success: true, data: newReview})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        const getAll = await Reviews.findAll({
                            include: [Users],
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        })
                        res.status(200).send({success: true, data: getAll})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })

                
router.route("/:ReviewsId")
                .put(async (req, res) => {
                    try {
                        const updatedReviews = await Reviews.update(req.body, {
                            where: {
                                id: req.params.ReviewsId
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
                        const deleteReview = await Reviews.destroy({
                            where: {
                                id: req.params.ReviewsId
                            }
                        })
                        res.status(204).send({success: true, message: "Product deleted"})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        const getById = await Reviews.findByPk(req.params.ReviewsId)
                        res.status(200).send({success: true, data: getById})
                    } catch (error) {
                        res.status(404).send({success: false, message: error.message})
                    }
                })


export default router