const {
  fetchUsers,
  submitUser,
  updateUser,
  removeUser,
  fetchUserByID,
} = require("../models/users.models");

exports.getAllUsers = (req, res) => {
    
  fetchUsers().then((users) => res.status(200).send({ users }));
};

exports.getUserByID = (req, res, next) => {
  const {user_id} = req.params

  if(isNaN(user_id)) throw {msg :"Bad Request: Invalid user_id", status: 400}

  fetchUserByID(user_id).then((user) => {
    
    res.status(200).send({user})

  })
  .catch((err) => {
    
    next(err)

  })

}

exports.postUser = (req, res, next) => {
  const { body } = req;

  submitUser(body)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => {
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