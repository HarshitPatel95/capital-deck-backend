const express = require('express');

const router = express.Router();

const { getFeedback, setFeedback } = require('../controllers/feedbackController');

router.route('/').get(getFeedback).post(setFeedback);

module.exports = router;
