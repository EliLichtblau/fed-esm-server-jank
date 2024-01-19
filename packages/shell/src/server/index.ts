import path from "node:path"
import url from "node:url"
import express from "express"
import { render } from "./render"


const app = express()


const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
app.use("/client", express.static(path.join(__dirname, "../client")))

app.get("/", render)

app.listen(3000, ()=>{
    console.log(`Listening 3000 pid: ${process.pid}`)
})

