const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const erroResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email nad password!"),
      400
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials!"), 401);
    }

    const verifyPassword = await user.matchPasswords(password);

    if (!verifyPassword) {
      return next(new ErrorResponse("Invalid credentials!"), 401);
    }

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await user.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email couldn't be sent"), 404);
    }
    const resetToken = user.getResetPasswordToken();
    await User.save();

    const resetUrl = `http:localhost:3000/passwordrest/${resetToken}`;

    const message = `
    <h1> You have requested a password reset </h1>
    <p> Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
    } catch (error) {}
  } catch (error) {}
};

exports.resetpassword = (req, res) => {
  res.send("Reset Password Route");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();

  res.status(statusCode).json({ success: true, token });
};
