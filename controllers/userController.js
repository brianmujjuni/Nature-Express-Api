const User = require("../models/userModel");
const catchAsysnc = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsysnc(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "sucess",
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsysnc(async (req, res, next) => {
  if (req.body.password ?? req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }
  //filter out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  //update user documet
  const updateUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsysnc(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
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
