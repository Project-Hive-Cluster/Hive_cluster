import express from "express"
const app = express()
import cors from "cors"
/*Environment Data*/
import dotenv from "dotenv"
dotenv.config()

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}


// use res.render to load up an ejs view file
app.use(express.json())

// Middelwears
app.use(cors(corsOptions))


/*And Every apis path here*/
const routes = require("./controller/index")
app.use("/", routes)


// need cookieParser middleware before we can do anything with cookies
const cookieParser = require("cookie-parser")
app.use(cookieParser())


/*If Page not found (404) this path handels it*/
app.get("*", function (req, res) {

    res.statusCode(404).json({ "status": "404", "massage": "addres not found" })
})

/********************************************************************
 *
 * 		Express Config
 *
 *********************************************************************/
/* Port come from env file if fail so it will run at 3000 port*/
const port = 3000
/* Express Init*/
app.listen(port)
console.log("Server is listening on port: " + port)

module.exports = app
