const rateLimit = require('express-rate-limit');

exports.generateLimiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minute
    max: 10,              // 10 requests per minute per IP
    message: { message: 'Too many requests. Please wait before generating again.' }
});

exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: { message: 'Too many auth attempts. Try again later.' }
});
