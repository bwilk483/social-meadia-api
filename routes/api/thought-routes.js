const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// api/thoughts
router.route("/").get(getAllThoughts);
router.route("/:id").get(getThoughtById);
router.route("/").post(createThought);
router.route("/:id").put(updateThought);
router.route("/:id").delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route("/:id/reactions").post(createReaction);
router.route("/:id/reactions/:rid").delete(deleteReaction);

module.exports = router;
