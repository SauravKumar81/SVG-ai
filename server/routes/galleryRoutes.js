const express = require('express');
const router = express.Router();
const { getPublicGallery, likeSVG } = require('../controllers/galleryController');
const protect = require('../middleware/authMiddleware');

router.get('/', getPublicGallery);
router.post('/:id/like', protect, likeSVG);

module.exports = router;
