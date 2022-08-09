import { Router } from "express"
import User from "../../module/user/user"
const user = new User
const api = Router()

api.post("/open", async (req, res) => {
    if (req.body) {
        res.send(await user.add(req.body.email, req.body.first, req.body.last, req.body.contact))
    } else {
        res.status(404).json({ "Error": "User data not found" })
    }
})


/************** Middelware **************/
// api.get("/*", async (req, res) => {
//     res.status(404).json({ Error: "Invalid Address" })
// })



module.exports = api