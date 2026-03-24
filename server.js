const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// 🔥 MongoDB Connection (LOCAL for now)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    roll: Number
});

const Student = mongoose.model("Student", studentSchema);

// ➕ Add Student
app.post("/add", async (req, res) => {
    const { name, roll } = req.body;

    const newStudent = new Student({ name, roll });
    await newStudent.save();

    res.send("Added");
});

// 📋 Get Students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running");
});