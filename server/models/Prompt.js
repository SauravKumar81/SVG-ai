const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, maxlength: 500 },
    svgCode: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Prompt', promptSchema);
