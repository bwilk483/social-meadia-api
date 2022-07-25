const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found with that ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  },
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found with that ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with that ID!" });
          return;
        }
        return User.findOneAndUpdate(
          { username: thoughtData.username },
          { $pull: { thoughts: params.id } },
          { new: true }
        )
          .then((data) => res.json(data))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found with that ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.rid } } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found with that ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
