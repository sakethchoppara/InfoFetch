const express = require('express');
const router = express.Router();
const {Student} = require('../model/studentModel');
const { where } = require('sequelize');

router.get('/students/get',async(req,res)=>{
    try {
        const details = await Student.findAll()
        res.json({
            status:true,
            details:details
        })
    } catch (error) {
        res.json({
            status:false,
            error:error
        })
    }
})

router.post('/students',async(req,res)=>{
    const type = req.headers['op-type']
    if(type === 'insert'){
        try {
            const newStudent = await Student.create(req.body)
            res.json({
                status:true
            })
        } catch (error) {
            res.json({
                status:false,
                error:error
            })        
        }
    }
    if(type === 'delete'){
        const {registration} = req.body
        try {
            await Student.destroy({
                where:{
                    registration: registration
                }
            })
            res.json({
                'status':true
            })
        } catch (error) {
            res.json({
                status:false,
                error:error
            })            
        }
    }
})


module.exports = router