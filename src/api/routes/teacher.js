import mongoose from "mongoose";
import express from "express";

const TeacherRouter = express.Router();

const TeacherSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

TeacherRouter.get("/", async (req, res) => {
    const Teachers = await Teacher.find();
    res.json(Teachers);
});

TeacherRouter.post("/", async (req, res) => {
    const Teacher = await Teacher.create(req.body);
    res.json(Teacher);
});

TeacherRouter.get("/:id", async (req, res) => {
    const Teacher = await Teacher.findById(req.params.id);
    res.json(Teacher);
});

export default TeacherRouter;