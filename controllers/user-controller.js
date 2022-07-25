const { User, Thought } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with that ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  },
  createUser({ body }, res) {
    User.create(body)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with that ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with that ID!" });
          return;
        }
        return Thought.deleteMany({ _id: { $in: userData.thoughts } })
          .then((data) => res.json(data))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.fid } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with that ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.fid } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with that ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
