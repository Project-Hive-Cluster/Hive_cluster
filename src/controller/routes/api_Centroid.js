const { Router } = require("express")
const api = Router()
const Centroid = require("../../module/Hive/Centroid")
const hive = new Centroid()

api.get("/get", async (req, res) => {
  res.send(await hive.get())
})

api.post("/search", async (req, res) => {
  // await hive.search(req.body.user).then((payload) => { res.send(payload) })
  //     .catch((err) => { res.status(404).json({ "error": err }) })
  await hive
    .search()
    .then((payload) => {
      res.send(payload)
    })
    .catch((err) => {
      res.status(404).json({ error: err })
    })
})

api.get("/init", async (req, res) => {
  let payload = await hive.create()
  res.send(payload)
})
api.get("/id", async (req, res) => {
  res.send(await hive.walletid())
})

/************** Middelware **************/
api.get("/*", async (req, res) => {
  res.status(404).json({ Error: "Invalid Address" })
})

module.exports = api
