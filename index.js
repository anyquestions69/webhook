require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

const user = require("./models/user");

app.use(express.json());
app.use(cookieParser());



async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

start();

app.get("/",async (req, res) => {
    const cookieHeader = req.headers.cookie;
    user.create({
      ip: req.ip,
      cookie: cookieHeader,
      headers: req.headers,
    });
    return res.send("ok");
});

app.get("/log", async (req, res) => {
    const users =  await user.find().sort({ createdAt: -1 }).limit(100);
    return  res.json(users);
})