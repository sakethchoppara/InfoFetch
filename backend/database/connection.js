const {Sequelize, Model} = require('sequelize');
const dotenv = require('dotenv').config()

const USER = process.env.DBUSER
const PASS = process.env.DBPASS
const HOST = process.env.DBHOST
const DB = process.env.DB

const sequelize = new Sequelize(DB,USER,PASS,{
    host:HOST,
    dialect:'postgres'
})



const testConnection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('connection successfully established')
    } catch (error) {
        console.log(`An error occured while connecting to Database ${error}`)
    }
}

module.exports={
    sequelize,
    testConnection
}