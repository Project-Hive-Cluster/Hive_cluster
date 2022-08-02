import { Router } from "express"
const api = Router()
import Hive from '../../module/hive/Hive'
const hive = new Hive

api.get("/", async (req, res) => {
    res.send(await hive.get_db_data())
})

api.post('/push', async (req, res) => {
    let data = await hive.pushCentroid(req.body.waletid, req.body.content, req.body.amount)
    res.send(data)
})
api.post("/search", async (req, res) => {
    await hive.search(req.body.user).then((payload) => { res.send(payload) })
        .catch((err) => { res.status(404).json({ "error": err }) })
})

api.post("/init", async (req, res) => {
    setTimeout(await hive.createCentroid().then((payload) => { res.send(payload) })
        .catch((err) => { res.status(404).json({ "error": err }) }), 3000)
})



/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})



module.exports = api