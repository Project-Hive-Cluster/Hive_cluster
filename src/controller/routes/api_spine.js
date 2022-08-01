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
    await hive.search(req.body.user).then((payload) => { res.send(payload) })
        .catch((err) => { res.status(404).json({ "error": err }) })
})

api.post("/init", async (req, res) => {
    setTimeout(await hive.createSpine().then((payload) => { res.send(payload) })
        .catch((err) => { res.status(404).json({ "error": err }) }), 3000)
})



/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})



module.exports = api