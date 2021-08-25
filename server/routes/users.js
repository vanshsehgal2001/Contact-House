const express=require('express')
const router=express.Router()
const {
    check,validationResult
}=require('express-validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const keys=require('../config/keys')

router.post('/',[check('name','Please enter name').not().isEmpty(),
check('email','Please enter a valid email').isEmail(),
check('password','Please enter a password of 6 or more than 6 characters').isLength({min:6})],
async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {name,email,password}=req.body

    let user=await User.findOne({email})
    if(user){
        return res.status(400).json({
            msg:"User already exists"
        })
    }
    user=new User({
        name,
        email,
        password
    })
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(password,salt)
    await user.save()

    const payload={
        user:{
            id:user._id
        }
    }
    jwt.sign(payload,keys.jwtSecret,{
        expiresIn:360000
    },(err,token)=>{
        if (err) throw err;
        res.json({token})
    })
})

module.exports=router;