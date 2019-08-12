const jwt = require('jsonwebtoken');

module.exports = {
  sign: (payload) => {
    const signOptions = {
      expiresIn: '24h', // 24 hours validity
    };
    return jwt.sign(payload, process.env.JWT_SECRET, signOptions);
  },
  verify: (token) => {
    const verifyOptions = {
      expiresIn: '24h', // 24 hours validity
    };
    try {
      return jwt.verify(token, process.env.JWT_SECRET, verifyOptions);
    } catch (err) {
      return false;
    }
  },
  decode: (token) => {
    return jwt.decode(token, {
      complete: true,
    });
    // returns null if token is invalid
  },
};
