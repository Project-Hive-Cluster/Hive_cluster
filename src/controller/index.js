import { Router } from "express"
/*Environment Data*/
require("dotenv").config()
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
const api = Router()
import Hive from '../cluster/Hive'
import { async } from "regenerator-runtime"
const hive = new Hive

// Cors Config
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
}

// Middlewares
api.use(cors(corsOptions))
api.use(bodyParser.json())
api.use(cookieParser())
api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accepcact"
    )
    res.header("Access-Control-Allow-Methods", ["GET", "POST", "PATCH", "DELETE"])
    next()
})


api.post('/data', async (req, res) => {

    // if (!req.body) res.sendStatus(404)
    let data = await hive.data(req.query.waletid, req.body)
    res.send(data)
})
api.get("/loadSpine", async (req, res) => {
    let data = await hive.loadSpine()
    res.send(data)
})
api.patch("/createGenius", async (req, res) => {
    res.send(await hive.createSpine())
})









/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})



module.exports = api