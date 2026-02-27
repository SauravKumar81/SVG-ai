const express = require('express');
const router = express.Router();
const { generateSVG, getHistory, togglePublic, deletePrompt } = require('../controllers/svgController');
const protect = require('../middleware/authMiddleware');

router.post('/generate', protect, generateSVG);
router.get('/history', protect, getHistory);
router.patch('/:id/toggle', protect, togglePublic);
router.delete('/:id', protect, deletePrompt);

module.exports = router;
