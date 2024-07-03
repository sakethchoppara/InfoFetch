const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");


const Student = sequelize.define('student',{
    firstname:{
        type:DataTypes.STRING(50),
        allowNull: false,
        defaultValue:null,
    },
    surname:{
        type:DataTypes.STRING(50),
        allowNull:false,
        defaultValue:null
    },
    registration:{
        type:DataTypes.STRING(10),
        allowNull:false,
        primaryKey:true
    },
    contact:{
        type:DataTypes.BIGINT,
        allowNull:false,
        primaryKey:true,
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull:false,
        defaultValue:null
    }
})

const updateModel = () =>{
    Student.sync()  
}

module.exports = {
    Student,
    updateModel
}