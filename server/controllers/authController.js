const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: signToken(user._id), user: { id: user._id, name, email } });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
        return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: signToken(user._id), user: { id: user._id, name: user.name, email } });
};

exports.me = async (req, res) => {
    res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email } });
};
