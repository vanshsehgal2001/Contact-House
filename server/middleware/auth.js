const jwt=require('jsonwebtoken')
const keys=require('../config/keys')

module.exports=(req,res,next)=>{
    const token=req.header('x-auth-token')

    if(!token){
        return res.status(401).json({msg:'Access denied, No token'})
    }

    try {
        const payload=jwt.verify(token,keys.jwtSecret)
        req.user=payload.user
        next();
    } catch (error) {
        res.status(401).json({msg:'Token is not valid'})
    }
}