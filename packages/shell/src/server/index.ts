import path from "node:path"
import express from "express"
import { render } from "./render"


const app = express()

// This should be an error in verbatim module syntax and it isn't
// fucking sick dog
// console.log(__dirname)
// app.use("/client", express.static(path.join(__dirname, "../client")))

app.get("/", render)

app.listen(3000, ()=>{
    console.log(`Listening 3000 pid: ${process.pid}`)
})

