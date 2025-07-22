const User = require('/Users/jabaya573@apac.comcast.com/Desktop/booknest-api/src/models/user.js');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password , role } = req.body;
  try {
    const user = await User.create({ name, email, password , role});
    const token = jwt.sign({ userId: user._id , role: role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ message: 'User created', token });
  } catch (err) {
    res.status(400).json({ message: 'Signup failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
