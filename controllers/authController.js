const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsysnc = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.signup = catchAsysnc(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({ name, email, password, passwordConfirm });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({
    status: "Success",
    data: {
      token,
      user: newUser,
    },
  });
});

exports.login = catchAsysnc(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please provide email and password", 400));
  }
  res.status(200).json({
    "token":'jjjjj'
  })
});
