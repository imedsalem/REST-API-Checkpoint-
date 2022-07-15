const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/User");
require("dotenv").config({ path: "./config/.env" });
const router = express.Router();
/*-----------------------------------------------------------------------------------------------------------*/
const app = express();
app.use(express.json());
/*-----------------------------------------------------------------------------------------------------------*/
// Connect with .env
const PORT = process.env.PORT;
const CONNECT = process.env.MONGO_URI;
/*-----------------------------------------------------------------------------------------------------------*/
// Connect with mongoose
const connectDb = async () => {
  try {
    await mongoose.connect(CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect to mongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
connectDb();
/*-----------------------------------------------------------------------------------------------------------*/
// create Router
app.use("/users", router);
/*-----------------------------------------------------------------------------------------------------------*/
// Get all users
router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.send(allUsers);
});
/*-----------------------------------------------------------------------------------------------------------*/
// Add a new user to the database
router.post("/", async (req, res) => {
  const { username, email, age } = req.body;
  try {
    const UserAdd = await User.create({ username, email, age });
    res.status(200).send({ msg: "sucess add" });
  } catch (error) {
    console.log(error);
  }
});
/*-----------------------------------------------------------------------------------------------------------*/
// Edit a user by id
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({ msg: "sucess update", updateUser });
  } catch (error) {
    console.log(error);
  }
});
/*-----------------------------------------------------------------------------------------------------------*/
// Remove a user by id
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).send({ msg: "sucess delete" });
  } catch (error) {
    console.log(error);
  }
});
/*-----------------------------------------------------------------------------------------------------------*/
// Connect to server
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`Example app listening on port ${PORT}!`)
);
