import express from "express";
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getAuth from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.get("/", async (req, res) => {
  await User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json({ error: e });
    });
});

UserRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashPassword });
      res.status(200).json({ msg: "User registered Successfully", user: user });
    } else {
      res.status(400).json({ msg: "Please fill all the required fields" });
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log("Received data:", req.body);
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ msg: "user not found" });
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);
    if (!comparePassword) {
      return res.status(400).json({ msg: "Wrong credentials" });
    }
    const token = jwt.sign({ id: existUser._id }, process.env.SECRET);
    res.status(201).json({ msg: "User logged in successfully", token: token });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

UserRouter.get("/auth", getAuth, (req, res) => {
  res.status(200).json(req.auth);
});

export default UserRouter;
