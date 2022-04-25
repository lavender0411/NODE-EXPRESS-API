const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors/index');

const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // joi
  // JWT check in thecontroller
  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // normally provided by db
  const id = new Date().getDate();

  // keep payload small => better user experience
  // JWT_SECRET must be more complexable gibberish
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  // console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  // console.log(decoded.username);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};
module.exports = { login, dashboard };
