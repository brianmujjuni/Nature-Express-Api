const User = require("./../models/userModel");
const catchAsysnc = require("./../utils/catchAsync");

exports.signup = catchAsysnc(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      user: newUser,
    },
  });
});
