const express = require("express")
const cors = require("cors")
const app = express()
const PORT= 4000

const User = require("./models/user")
const { default : mongoose } = require("mongoose")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors()) 



const dbURL = "mongodb+srv://shreyasgowdampp:Mz527TGw93fGAs6b@cluster-db.gwcjzcp.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURL).then(()=>{
    console.log("successfully connected into database");
})

app.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{
        if(userData) {
            if (req.body.password == userData.password) {
                res.send({message:'Login successfully'})
            } else {
                res.send({message:'Login failed'})
            }
        }else{
            res.send({message:'no account seems to be matched with your email'})
        }
    })

})

app.post('/signup',async(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{      
        if(userData){
            res.send({message:'Seems like you already have a account with this email address'})
        }else{
            const data = new User({             
                name:req.body.name,
                mobile:req.body.mobile,
                email:req.body.email,
                password:req.body.password
                
            })
            data.save(()=>{
                if (err) {
                    res.send(err)
                } else {
                    res.send({message:"User registered successfully"})
                }
            })
        }
    }) 
    
})


app.listen(PORT,()=>{
    console.log(`listening on the port ${PORT}`);
})