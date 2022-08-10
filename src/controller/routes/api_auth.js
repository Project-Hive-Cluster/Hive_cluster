import { Router } from "express"
import { login } from "../../module/user/auth"

const api = Router()

api.post("/login", async (req, res) => {
    if (req.body) {
        let data = await login(req.body.walletid, req.body.password)
        res.send(data)
    } else {
        res.status(404).json({ "Error": "User data not found" })
    }
})

/************** Middelware **************/
// api.get("/*", async (req, res) => {
//     res.status(404).json({ Error: "Invalid Address" })
// })



module.exports = api