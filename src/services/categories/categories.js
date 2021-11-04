import express from 'express';
import models from "../../db/models/index.js"
const { Categories } = models


const router = express.Router()



router.route('/')
                .post(async(req, res) => {
                    try {
                        const category = await Categories.create(req.body)
                        res.status(201).send({success:true , data: category})
                    } catch (error) {
                        res.status(400).send({success: false, error: error.message})
                    }
                })
                .get(async (req, res) => {
                    try {
                        const category = await Categories.findAll()
                        res.status(200).send({success:true , data: category})
                    } catch (error) {
                        res.status(400).send({success: false, error: error.message})
                    }
                })


export default router