const {} = require("../models/app.models");
const {
  fetchUsers,
  submitUser,
  updateUser,
  removeUser,
} = require("../models/users.models");

exports.getAllUsers = (req, res) => {
  fetchUsers().then((users) => res.status(200).send({ users }));
};

exports.postUser = (req, res, next) => {
  const { body } = req;

  submitUser(body)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.patchUser = (req, res, next) => {
  const { body } = req;
  const { user_id } = req.params;

  updateUser(body, user_id)
    .then((newDetails) => {
      res.status(200).send(newDetails);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const { user_id } = req.params;

  removeUser(user_id)
    .then((deletedUser) => {
      switch (true) {
        case deletedUser === undefined:
          res.status(404).send({ msg: "User not found" });
          break;
        default:
          res.status(204).send();
      }
    })
    .catch((err) => {
      next(err);
    });
};
