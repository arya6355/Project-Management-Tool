const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.get("/test", (req, res) => {
    res.send("Backend Working Successfully");
});

// DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// SERVER
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});