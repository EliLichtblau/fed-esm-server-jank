import path from "node:path"
import url from "node:url"
import express from "express"

const __dirname = path.dirname(url.fileURLToPath(new URL(import.meta.url)))
console.log(__dirname)

const app = express()

app.use("/",express.static(path.join(__dirname, "../")))


app.listen(3001, ()=>{
    console.log("remote starting")
})