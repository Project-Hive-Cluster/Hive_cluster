import { Router } from "express"
const api = Router()

import hive_seq from '../../models/index'

api.get("/test", async (req, res) => {
    res.send(await hive_seq())

})


/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})


module.exports = api