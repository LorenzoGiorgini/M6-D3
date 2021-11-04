import express from "express"
import models from "../../db/models/index.js"
const { Users , Reviews } = models



const router = express.Router()

//routes for the users CRUD routes

router.route("/")
                .get(async (req, res) => {
                    try {
                        const user = await Users.findAll({
                            include: [Reviews],
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        })
                        res.status(200).send({success: true, data: user})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .post(async (req, res) => {
                    try {
                        const user = await Users.create(req.body)
                        res.status(200).send({success: true, data: user})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })


router.route("/:userId")
                .get(async (req, res) => {
                    try {
                        const user = await Users.findAll({where: {id: req.params.userId}, include: [Reviews]})
                        res.status(200).send({success: true, data: user})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .put(async (req, res) => {
                    try {
                        const user = await Users.update(req.body, {
                            where: {
                                id: req.params.userId
                            },
                            returning: true
                        })
                        res.status(200).send({success: true, data: user})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                .delete(async (req, res) => {
                    try {
                        const user = await Users.destroy({where: {id: req.params.userId}})
                        res.status(204).send({success: true, data: "User Deleted succesfully"})
                    } catch (error) {
                        res.status(400).send({success: false, message: error.message})
                    }
                })
                


export default router