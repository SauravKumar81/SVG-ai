const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    // --- MOCK TOKEN BYPASS FOR DEV ---
    if (token === 'dummy-token-for-dev') {
        try {
            let mockUser = await User.findOne({ email: 'saurav@example.com' });
            if (!mockUser) {
                mockUser = await User.create({
                    name: 'Saurav',
                    email: 'saurav@example.com',
                    password: 'password123'
                });
            }
            req.user = mockUser;
            return next();
        } catch (err) {
            console.error(err);
        }
    }
    // ---------------------------------

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch {
        res.status(401).json({ message: 'Token invalid or expired' });
    }
};
