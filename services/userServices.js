const User = require('../models/userModel');

const getUserByIdService = async (id) => {
  const user = await User.findById(id);
  return user;
};

const checkUserExistService = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const createUserervice = async (name, email, hashedPassword, dob) => {
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    dob
  });
  return user;
};

const updateUserByIdService = async (id, name, email, hashedPassword, dob, contactno, gender) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password: hashedPassword,
      dob,
      contact_no: contactno,
      gender
    },
    {
      new: true
    }
  );
  return updatedUser;
};

module.exports = {
  getUserByIdService,
  checkUserExistService,
  createUserervice,
  updateUserByIdService
};
