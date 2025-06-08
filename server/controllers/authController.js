const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, department, year } = req.body;

  // Ensure only college email
  if (!email.endsWith('@kiit.ac.in')) {
    return res.status(400).json({ error: 'Use college email only.' });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({ name, email, passwordHash, department, year });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token, user: { name: user.name, role: user.role, email: user.email } });
};

module.exports = { register, login };
