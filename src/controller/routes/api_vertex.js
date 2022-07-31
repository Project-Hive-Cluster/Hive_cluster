import { Router } from "express"
const api = Router()
import v from '../../app/Vertix'
const hive = new Hive

api.post("/get", async (req, res) => {
    let data = await v.get()
    res.send(data)
})

api.post('/push', async (req, res) => {
    let data = await v.insert(req.body.waletid, req.body.content)
    res.send(data)
})
api.post("/search", async (req, res) => {
    let data = await v.search(req.body.user)
    if (data === undefined) {
        res.status(404).json("Not Found ")
    } else {
        res.send(data)
    }
})

api.patch("/genarate", async (req, res) => {
    res.send(await v.createSpine())
})









/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})



module.exports = api