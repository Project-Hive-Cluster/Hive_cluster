import { Router } from "express"
/*Environment Data*/
require("dotenv").config()
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
const api = Router()

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
/*And Every apis path here*/
const user = require("./routes/api_wallet")
api.use("/wallet", user)
const Spine = require("./routes/api_Centroid")
api.use("/spine", Spine)
const _vartix = require("./routes/api_vertex")
api.use("/", _vartix)



/************** Middelware **************/
api.get("/*", async (req, res) => {
    res.status(404).json({ Error: "Invalid Address" })
})



module.exports = api