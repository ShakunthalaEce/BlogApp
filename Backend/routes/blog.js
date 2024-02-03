import Blog from "../models/BlogSchema.js";
import express from "express";
import getAuth from "../middleware/auth.js";

const BlogRouter = express.Router();
BlogRouter.use(express.json());

const response = (res, status, result) => {
  res.status(status).json(result);
};
BlogRouter.get("/", getAuth,async (req, res) => {
  await Blog.find().populate("user","-password").sort("-createdOn")
    .then((result) => {
      response(res, 200, result);
    })
    .catch((e) => {
      response(res, 400, { error: e });
    });
});

BlogRouter.post("/create", getAuth, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    if (title && content) {
      //console.log(title,image,content,req.auth);
      const blog = new Blog({
        title,
        content,
        image,
        user: req.userId,
      });
      await blog.save();
      response(res, 200, { msg: "Blog Created!", blog: blog });
    }
  } catch (e) {
    response(res, 400, { error: e });
  }
});

export default BlogRouter;

BlogRouter.delete("/delete/:id", getAuth, async (req, res) => {
  try {
    const deleteBlog = await Blog.findOneAndDelete({
      user: req.userId,
      _id: req.params.id,
    });
    if (!deleteBlog) {
      response(res, 404, { error: "Blog not Found" });
    }
    response(res, 200, { msg: "Blog deleted successfully" });
  } catch (e) {
    response(res, 400, { error: e });
  }
});

BlogRouter.put("/update/:id", getAuth, async (req, res) => {
  const { title, content, image} = req.body;
  await Blog.findOneAndUpdate(
    { user: req.userId, _id: req.params.id },
    {
      title,
      content,
      image,
    }
  )
    .then((result) => response(res, 200, { msg: "blog updated", blog: result }))
    .catch((e) => {
      response(res, 400, e);
    });
});

BlogRouter.get("/:id",getAuth,async(req,res)=>{
  await Blog.findById(req.params.id).populate("user","-password")
  .then(result=>response(res,200,result))
  .catch(err=>response(res,400,{error:err}))
})
