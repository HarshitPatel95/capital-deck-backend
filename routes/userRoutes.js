const express = require('express');

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getProfile);
router.put('/:id', protect, updateProfile);

module.exports = router;
