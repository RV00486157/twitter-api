const express = require('express')

const app = express()
const PORT = 3030
const DBconnect = require('./config/db')
const router = require('./api/twitter')

app.use(express.json())

DBconnect()

app.use("/",router)

app.listen(PORT,()=>{
    console.log(`Listening to port : ${PORT}`)
})

