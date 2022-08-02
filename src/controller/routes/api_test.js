import { Router } from "express"
const api = Router()
import db from '../../Database/utils/database'
import user from '../../Database/models/User'
import Centroid from '../../Database/models/Centroid'
import Child_Node from '../../Database/models/Child_Node'


api.get("/user", async (req, res) => {
    user.findAll().then((data) => {
        res.send(data)
    }).catch(e => console.error(e))

})
api.get("/center", async (req, res) => {
    Centroid.findAll().then((data) => {
        res.send(data)
    }).catch(e => console.error(e))

})
api.get("/node", async (req, res) => {
    Child_Node.findAll().then((data) => {
        res.send(data)
    }).catch(e => console.error(e))

})


/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})


module.exports = api