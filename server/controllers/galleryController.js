const Prompt = require('../models/Prompt');

exports.getPublicGallery = async (req, res) => {
    try {
        const galleryItems = await Prompt.find({ isPublic: true })
            .populate('user', 'name')
            .sort({ likes: -1, createdAt: -1 });

        res.status(200).json(galleryItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.likeSVG = async (req, res) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'SVG not found' });

        // Simplistic like system for demonstration.
        // In production, maintain an array of user IDs who liked to prevent multiple likes.
        prompt.likes += 1;
        await prompt.save();

        res.status(200).json(prompt);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
