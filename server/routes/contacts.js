const express=require('express')
const router=express.Router()
const {
    check,validationResult
}=require('express-validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const Contact=require('../models/Contact')
const keys=require('../config/keys')
const auth = require('../middleware/auth')

router.get('/',auth,async (req,res)=>{
    const contact=await Contact.find({user:req.user.id}).sort({date:-1})
    res.send(contact) 
})

router.post('/',[auth,[
    check('name','Please enter name').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {name,phone,type,email}=req.body

    const newContact=new Contact({
        name,
        email,
        phone,
        type,
        user:req.user.id
    })
    const contact=await newContact.save()
    res.json(contact)
})

router.put('/:id',(req,res)=>{
    res.send('Update all contacts')
})

router.delete('/:id',(req,res)=>{
    res.send('Delete all contacts')
})

module.exports=router;