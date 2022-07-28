import { Router } from "express"
const api = Router()
import Hive from '../../app/Hive'
const hive = new Hive

api.get("/load", async (req, res) => {
    let data = await hive.loadSpine()
    res.send(data)
})

api.post('/addUser', async (req, res) => {
    let data = await hive.addSpine(req.body.waletid, req.body.content)
    res.send(data)
})
api.post("/user", async (req, res) => {
    res.send(await hive.loadUser(req.body.user))
})

api.patch("/genarate", async (req, res) => {
    res.send(await hive.createSpine())
})









/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})



module.exports = api