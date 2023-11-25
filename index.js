const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
config();
app.use(cors()); //To allow the cross origin http requests
app.use(express.json()); // To parse the Requests to this express app
const port = 3001;

const path = require("path");

//Servs the static files from the build directory of the React App
app.use(express.static(path.join(__dirname, "my-app/build")));

try {
  // Connect to MongoDB
  mongoose
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"));
} catch (err) {
  console.log(err);
}

//Creating the Schema for the Users
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

//Creating the Model for the Users
const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  const user = await User.findOne({ username: req.body.email }).exec();

  if (user === null) {
    if (req.body.email === "" && req.body.password === "") {
      res.send("Please Fill The Details!");
    } else {
      const newUser = new User({
        username: req.body.email,
        password: req.body.password,
        name: req.body.name,
      });
      newUser.save();

      res.send("Details Saved Successfully!");
    }
  } else {
    res.send("User Already Exists!");
  }
});

//User login
app.get("/user", async (req, res) => {
  const loginData = req.query;

  const user = await User.findOne({ username: loginData.username }).exec();

  if (user === null) {
    res.send("User Not Found! Please Register");
  } else {
    if (
      loginData.username === user.username &&
      loginData.password === user.password
    ) {
      res.send("User Authenticated!");
    } else {
      res.send("Username or Passward Incorrect!");
    }
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-app/build", "index.html"));
});

app.listen(port, function (req, res) {
  console.log("Server is started and Live on Port " + port);
});
