const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connect = require("./database/db.js");
const QuestionModel = require("./model/Question.js");

const cors = require("cors");

dotenv.config();

//creating express app
const app = express();

//middleware to avoid cors error
app.use(cors());
app.use(express.json());

//this application only have three route add question or get question and last delete Question

app.post("/api/v1/add", async (req, res) => {
  console.log(req.body);
  const { question, options, correct } = req.body;
  switch (true) {
    case !question: {
      res.json({ succes: false, message: "please provide question" });
      return;
    }
    case !options: {
      res.json({ succes: false, message: "please provide options" });
      return;
    }
    case !correct: {
      res.json({ succes: false, message: "please provide correct" });
      return;
    }
  }
  try {
    const questionInstance = new QuestionModel(req.body);
    await questionInstance.save();
    res.json({ succes: true, message: "Question Added To Database" });
  } catch (error) {
    res.json({ succes: false, message: "Internal Server Error" });
  }
});

app.get("/api/v1/getall", async (req, res) => {
  try {
    const data = await QuestionModel.find();
    res.json({ succes: true, data });
  } catch (error) {
    res.json({ succes: false, message: "Internal Server Error" });
  }
});

app.delete("/api/v1/delete", async (req, res) => {
  const { id } = req.query;
  try {
    await QuestionModel.findByIdAndDelete(id);
    res.json({ succes: true, message: "Question Deleted Succesful" });
  } catch (error) {
    res.json({ succes: false, message: "Internal Server Error" });
  }
});



const port = process.env.PORT || 34789;

app.listen(port, () => {
  connect();
  console.log(`Server Running At Port ${port}`);
});

module.exports = app;
