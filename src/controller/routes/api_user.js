import { Router } from "express"
import User from "../../module/user/user"
const user = new User
const api = Router()

api.post("/adduser", async (req, res) => {
    if (req.body.email) {
        res.send(await user.add(req.body.email))
    } else {
        // res.status(404).json({ "Error": "User data not found" })
    }
})


/************** Middelware **************/
// api.get("/*", async (req, res) => {
//     res.status(404).json({ Error: "Invalid Address" })
// })



module.exports = api