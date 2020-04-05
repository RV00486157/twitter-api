const express = require('express')

const app = express()
const PORT = 3030
const DBconnect = require('./config/db')
const router = require('./api/twitter')

app.use(express.json())

DBconnect()

app.use("/",router)

app.use("/",(req,res)=>{
    res.send("The page you are looking for does not exist")
})

app.listen(PORT,()=>{
    console.log(`Listening to port : ${PORT}`)
})

