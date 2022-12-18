const  { Router } = require("express")
const  User = require("../../module/user/user")
const user = new User()
const api = Router()

api.post("/open", async (req, res) => {
  try {
    if (req.body) {
      let data = await user.add(
        req.body.email,
        req.body.first,
        req.body.last,
        req.body.contact
      )
      data = JSON.parse(data)
      const walletid = data.walletid
      const authokey = data.authokey
      res.cookie(`walletid`, walletid, { expire: 200 + Date.now() })
      res.cookie(`public`, authokey, { expire: 200 + Date.now() })
      res.send(data)
    } else {
      res.status(404).json({ Error: "User data not found" })
    }
  } catch (e) {
    res.send("404", e)
  }
})

/************** Middelware **************/
// api.get("/*", async (req, res) => {
//     res.status(404).json({ Error: "Invalid Address" })
// })

module.exports = api
