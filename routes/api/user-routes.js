const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// api/users
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById);
router.route("/").post(createUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

// api/users/:userId/friends/:friendId
router.route("/:id/friends/:fid").post(addFriend);
router.route("/:id/friends/:fid").delete(deleteFriend);

module.exports = router;
