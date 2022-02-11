
const express =require('express')
const registeredUser = require('./models/user')
const cors = require('cors')
const mongoose = require('mongoose')





const app = express()

app.use(cors({origin:"*"}))
app.use(express.json())

mongoose.connect(`mongodb+srv://mayur3301:3301@cluster0.b24rp.mongodb.net/MERNDB?retryWrites=true&w=majority`)



app.post('/login',async(req,res)=>{
    const body = req.body
    const {email,password} = body
    const user = await registeredUser.findOne({email:email,password:password})
    try{
        if(!user){
            res.send({message:"no user found",loggedin:false})
        }
        else{
            res.send({message:"user logged in sucessfully",loggedin:true,user:user})
        }
    }catch(err){
        res.send(err)
        console.log(err)
    }
})

app.post('/register',async(req,res)=>{
    const body = req.body
    const {email,username} = body
    const user =await registeredUser.findOne({email:email})

    try{
        if(!user){
            const name = await registeredUser.findOne({username:username})
            if(!name){
                try{
                    registeredUser.create(body)
                    res.send({message:"User has been created",
                    success:true   
                    })
                    
                }catch(err){
                    res.send({message:err,
                    success:false   
                    })
                }
            }
            else{
                res.send({message:`A user already exists with the username ${username}`,
                success:false,
                user:name,})
            }
        }
        else{
            res.send({message:`A user already exists with the email ${email} `,
            signedin:false,
            user:user
            })
         } 
    }catch(err){
        res.send({message:err,
        success:false})
    } 
})





app.listen(process.env.PORT ,()=>{
    console.log("Live on port 8000")
})