const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const matches = require("./controllers/matches");
// Basically creating an express app
const app = express();

//CORS Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Change this to the frontend domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If you're using cookies for authentication
  })
);

app.use(express.json());
app.use((req, res, next) => {
  next();
});

//routes

app.use("/matches", matches);

// Base route
app.get("/", (req, res) => {
  res.json({
    message: "Server pinged successfully",
  });
});

// initializing mongo
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DB connected successfully");
    //This is the app listener
    app.listen(process.env.PORT, () => {
      console.log(`listing on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
