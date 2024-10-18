const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsysnc = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsysnc(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({ name, email, password, passwordConfirm });
  const token = signToken(newUser._id);
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
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = signToken(user._id);

  res.status(200).json({
    token: token,
  });
});
