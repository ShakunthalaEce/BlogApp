import mongoose from "mongoose"

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})

const Blog=mongoose.model("blog",BlogSchema);

export default Blog;