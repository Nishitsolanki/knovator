const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { secret } = require('../config/config')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username,email, password: hashedPassword });
    const token = jwt.sign({email:user.email,id : user._id},secret)
    await user.save();
    return res.status(201).send({user:user,token:token, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 exports.login = async (req, res) => {
  try {
    const { username, password,email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({email:user.email,id : user._id},secret)
    return res.status(200).send({user:user,token:token, message: 'User login successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
