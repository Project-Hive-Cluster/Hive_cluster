import { Router } from "express"
const api = Router()
import Hive from '../../app/hive/Hive'
const hive = new Hive

api.get("/get", async (req, res) => {
    let data = await hive.getSpine()
    res.send(data)
})

api.post('/push', async (req, res) => {
    let data = await hive.pushSpine(req.body.waletid, req.body.content, req.body.amount)
    res.send(data)
})
api.post("/search", async (req, res) => {
    let data = await hive.search(req.body.user)
    if (data === undefined) {
        res.status(404).json("Not Found ")
    } else {
        res.send(data)
    }
})

api.patch("/genarate", async (req, res) => {
    res.send(await hive.createSpine())
})









/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})



module.exports = api