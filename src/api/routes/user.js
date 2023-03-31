import mongoose from "mongoose";
import express from "express";

const UserRouter = express.Router();

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);

UserRouter.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

UserRouter.post("/", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

UserRouter.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

export default UserRouter;