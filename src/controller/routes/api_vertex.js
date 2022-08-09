import { Router } from "express"
const api = Router()
import Vertix from '../../module/Hive/Vertix'
const V = new Vertix


api.post('/push', async (req, res) => {
    try {
        let data = await V.insert(req.body.waletid, req.body.data, req.body.to, req.body.amount)
        res.send(data)
    } catch (err) {
        res.send("Error " + err)
    }
})
api.post('/balance', async (req, res) => {
    let data = await V.balance(req.body.waletid)
    res.send("Balance " + data + " BDT")
})









/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})



module.exports = api