import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import "./db/database.js"

import UserRouter from "./routes/user.js"
import BlogRouter from "./routes/blog.js"

dotenv.config()

const port=process.env.PORT

const app=express()

app.use(express.json())
//app.use(cors({credentials:true}))
app.use(cors({ credentials: true, origin: true }));

app.use("/api/user",UserRouter)
app.use("/api/blog/",BlogRouter)

// app.get('/',(req,res)=>{
//     res.json({msg:"This is home page"})
// })

// app.get('/about',(req,res)=>{
//     res.json({msg:"This is about page"})
// })

// app.post('/',(req,res)=>{
//     console.log(req.body);
//     res.json(req.body);
// })

app.listen(port,()=>{
    console.log("App is running on port ",port);
})