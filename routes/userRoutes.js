const express = require("express");
const {getAllUsers,createUser,getUser,updateUser,deleteUser, updateMe} = require('../controllers/userController')
const {signup, login,forgotPassword,resetPassword,protect, updatePassword} =require('./../controllers/authController')

const router = express.Router();


router.route('/signup').post(signup)
router.route("/login").post(login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').patch(resetPassword)
router.route('/updateMyPassword').patch(protect,updatePassword)
router.route('/updateMe',protect,updateMe)

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
