const express = require('express');

const router = express.Router();

const {
  getCategories,
  setCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

router.route('/').get(protect, getCategories).post(protect, setCategory);
router.route('/:id').delete(protect, deleteCategory).put(protect, updateCategory);

module.exports = router;
