const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Check user authorization for data accessibility
const checkUserDataAuthorization = async (dataobject, requesteduser) => {
  let Authorized = false;

  if (requesteduser && requesteduser.id === dataobject.user.toString()) {
    Authorized = true;
  }

  return Authorized;
};

// Generate JWT
const generateTokenService = (id) => {
  return jwt.sign({ id }, 'capitaldeck2022', {
    expiresIn: '30d'
  });
};

// Generate JWT
const hashedPasswordService = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

// Generate JWT
const checkPasswordServices = (password, dataobject) => {
  const passwordMatch = bcrypt.compare(password, dataobject.password);

  return passwordMatch;
};

module.exports = {
  checkUserDataAuthorization,
  generateTokenService,
  hashedPasswordService,
  checkPasswordServices
};
