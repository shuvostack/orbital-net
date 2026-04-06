const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Token valid for 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;