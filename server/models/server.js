const express=require('express')
const mongoose=require('mongoose')
const keys=require('../config/keys')
const bodyParser=require('body-parser')
require('./User')
require('./Contact')

const app=express()

app.get('/',(req,res)=>{
    // res.send('Hello all!!!')
    res.json({
        "msg":'Hello'
    })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(keys.mongoURI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
let db=mongoose.connection;

db.once('open', ()=>{
    console.log('Connected to MongoDB!!')
})

db.on('error', (err)=>{
    console.log('DB Error!!!')
})


app.use('/api/users',require('../routes/users'))
app.use('/api/auth',require('../routes/auth'))
app.use('/api/contacts',require('../routes/contacts'))

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log('Server started...')
})