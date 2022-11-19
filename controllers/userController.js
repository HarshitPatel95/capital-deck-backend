const asyncHandler = require('express-async-handler');
const {
  generateTokenService,
  hashedPasswordService,
  checkPasswordServices
} = require('../services/commonServices');
const {
  getUserByIdService,
  checkUserExistService,
  createUserervice,
  updateUserByIdService
} = require('../services/userServices');

// @desc    Register New User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cpassword, dob } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check password and confirm password different
  if (password !== cpassword) {
    res.status(400);
    throw new Error('Confirm password does not match with password');
  }

  try {
    // Check if user exists
    const user = await checkUserExistService(email);
    if (user) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashedPasswordService(password);

    // Create user
    const newuser = await createUserervice(name, email, hashedPassword, dob);

    if (newuser) {
      res.status(201).json({
        _id: newuser.id,
        name: newuser.name,
        email: newuser.email,
        token: generateTokenService(newuser._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (e) {
    throw new Error(e.message);
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user email
    const user = await checkUserExistService(email);

    if (user) {
      // Check for user password
      const passwordMatch = await checkPasswordServices(password, user);

      if (passwordMatch) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateTokenService(user._id)
        });
      } else {
        res.status(400);
        throw new Error('Invalid credentials');
      }
    } else {
      res.status(400);
      throw new Error('Invalid user');
    }
  } catch (e) {
    throw new Error(e.message);
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Update User Profile
// @route   PUT /api/users/:id
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password, dob, contactno, gender } = req.body;
  const { user } = req;
  const paramid = req.params.id;

  try {
    const currentuser = await getUserByIdService(paramid);
    // Check for user
    if (!currentuser) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the user
    if (currentuser._id.toString() !== user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    // Hash password
    const hashedPassword = await hashedPasswordService(password);

    const updatedUser = await updateUserByIdService(
      req.params.id,
      name,
      email,
      hashedPassword,
      dob,
      contactno,
      gender
    );

    res.status(200).json(updatedUser);
  } catch (e) {
    throw new Error(e.message);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
};
