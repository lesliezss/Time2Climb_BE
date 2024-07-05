const express = require("express");
const {
  getClimbsBySessionId,
  getClimbsByUserId,
  postNewClimbController,
  patchClimbsController,
  deleteClimbByIdController
} = require("./controllers/climbs.controllers");

const {
  getAllUsers,
  postUser,
  patchUser,
  deleteUser,
} = require("./controllers/users.controllers");

const app = express();

app.use(express.json());

//edit endpoints.json as we go!! :)

//get, post, patch, delete

//USERS
app.get("/api/users", getAllUsers);

app.post("/api/users", postUser);

app.patch("/api/users/:user_id", patchUser);

app.delete("/api/users/:user_id", deleteUser);

//SESSIONS

//CLIMBS

app.get("/api/climbs/:session_id", getClimbsBySessionId);

app.get("/api/climbs/users/:user_id", getClimbsByUserId);

app.post("/api/climbs", postNewClimbController);

app.patch("/api/climbs/:climb_id", patchClimbsController);

app.delete("/api/climbs/:climb_id", deleteClimbByIdController);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Input" });
  } else next(err);
});

//handles when path is incorrect
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});
//psql errors
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});
//custom errors
app.use((err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
//server errors
app.use((err, req, res, next) => {
  console.log(err, "<<------ from our 500");
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
