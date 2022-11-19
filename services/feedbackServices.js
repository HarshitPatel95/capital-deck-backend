const Feedback = require('../models/feedbackModel');

const getFeedbackService = async (query, projection, option) => {
  const feedbackes = await Feedback.find(query, projection, option);
  return feedbackes;
};

const setFeedbackService = async (name, email, message) => {
  const feedback = await Feedback.create({
    name,
    email,
    message
  });
  return feedback;
};

module.exports = {
  getFeedbackService,
  setFeedbackService
};
