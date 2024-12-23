const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');




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
  res.status(201).json({  user });
}

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return errorResponse(res, 'Invalid credentials', 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return errorResponse(res, 'Invalid credentials', 400);
  }

    // If login is successful, generate a JWT token
    const token = jwt.sign({ _id: user._id, email: user.email }, // Payload with user data
      process.env.JWT_SECRET,               // Secret key to sign the token
      { expiresIn: '24h' }                 // Set token expiry time (24 hours)
    );
  
    // Send the token back to the client (you could also send it in a cookie or header)
    res.status(200).json({success: true,msg: 'Login successful',token: token, // Include the token in the response
    });
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