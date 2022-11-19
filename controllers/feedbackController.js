const asyncHandler = require('express-async-handler');
const { getFeedbackService, setFeedbackService } = require('../services/feedbackServices');

// @desc    Get Feedback
// @route   GET /api/feedback
// @access  Public
const getFeedback = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await getFeedbackService({}, null, null);
    res.status(200).json(feedbacks);
  } catch (e) {
    throw new Error(e.message);
  }
});

// @desc    Set Feedback
// @route   POST /api/feedback
// @access  Public
const setFeedback = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name && !email) {
    res.status(400);
    throw new Error('Please fill all field');
  }

  try {
    const feedback = await setFeedbackService(name, email, message);
    res.status(200).json(feedback);
  } catch (e) {
    throw new Error(e.message);
  }
});

module.exports = {
  getFeedback,
  setFeedback
};
