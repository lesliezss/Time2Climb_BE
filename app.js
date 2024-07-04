const express = require("express");
const {
  getClimbsBySessionId,
  getClimbsByUserId,
  postNewClimbController,
} = require("./controllers/climbs.controllers");

const app = express();

app.use(express.json());

//edit endpoints.json as we go!! :)

//get, post, patch, delete

//USERS

//SESSIONS

//CLIMBS

app.get("/api/climbs/:session_id", getClimbsBySessionId);
app.get("/api/climbs/users/:user_id", getClimbsByUserId);
app.post("/api/climbs", postNewClimbController);
//PATCH /api/climbs/:climb_id (edit an existing climb)
//DELETE /api/climbs/:climb_id (delete an existing climb)

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

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
