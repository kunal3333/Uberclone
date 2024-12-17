const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body; 

  let salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword
  });

  // const token = user.generateAuthToken();

  res.status(201).json({  user });
}

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return errorResponse(res, 'Invalid credentials', 400);
  }
console.log(user)
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch , user)
  if (!isMatch) {
    return errorResponse(res, 'Invalid credentials', 400);
  }
  // const payload = { user: { id: user._id } };
  // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({success: true, msg:'login success',});

}

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);

}

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: 'Logged out' });

}