const { promisify } = require("util");
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
  const { name, email, password, passwordConfirm, role } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });
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
    status: "success",
    token: token,
  });
});

exports.protect = catchAsysnc(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in ,Please log in to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user beloging to the token does not exists ")
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changes password! Please login again", 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You donot have permission to perform this action")
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsysnc(async(req,res,next)=>{
 
  const user = await User.findOne({email: req.body.email})
 
  if(!user){
    return next(new AppError('There is no user with email address',404))
  }
   const resetToken = user.createPasswordResetToken()
   await user.save({validateBeforeSave: false})
  // next()
})

exports.resetPassword = (req,res,next)=>{

}
