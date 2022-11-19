const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const errorHandler = require('./middleware/errorMiddleware');
const logger = require('./config/logger');

const port = process.env.PORT || 80;
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
