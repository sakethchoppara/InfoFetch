const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const {testConnection} = require('./database/connection')
const {updateModel} = require('./model/studentModel')
const router = require('./api/routes')
require('dotenv').config() //loads .env data

//<----------middlewares---------->

app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.json())


app.use('/api',router)

testConnection()
updateModel()
    
//<----------routes---------->

const port = process.env.PORT

app.get('/api',(req,res)=>{
    res.send('online')
})


app.listen(port)
