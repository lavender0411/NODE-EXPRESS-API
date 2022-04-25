const jwt = require('jsonwebtoken');
// const { StatusCodes } = require('http-status-codes');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
  // res.status(StatusCodes.CREATED).json({ user });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
