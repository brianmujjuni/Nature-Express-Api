const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require("../controllers/userController");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} = require("./../controllers/authController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);
//protect routes below
router.use(protect);
////
router.route("/updateMyPassword").patch(updatePassword);
router.route("/me").get(protect, getMe, getUser);
router.route("/updateMe").patch(protect, updateMe);
router.route("/deleteMe").delete(deleteMe);
//restrict admin only
restrictTo("admin");
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

//revie
module.exports = router;
