const User = require("../models/userModel");
const catchAsysnc = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsysnc(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "sucess",
    data: {
      users,
    },
  });
});

exports.updateMe = (req, res, next) => {
  if (req.body.password ?? req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
  res.status(200).json({
    status: "success",
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
