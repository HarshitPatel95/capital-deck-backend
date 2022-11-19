const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, 'Please add a category name']
    },
    category_type: {
      type: String,
      required: [true, 'Please add a category type']
    },
    category_desc: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Category', categorySchema);
