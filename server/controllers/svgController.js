const { GoogleGenerativeAI } = require('@google/generative-ai');
const Prompt = require('../models/Prompt');

// Using dummy API key if none is provided to avoid crashing the server immediately
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'sk-dummy-key');

exports.generateSVG = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

        // In a real application, make sure GEMINI_API_KEY is correctly set in .env
        // Here we wrap it in a try/catch to handle API auth errors gracefully
        let svgCode = '';

        try {
            const model = genAI.getGenerativeModel({
                model: 'gemini-1.5-pro-latest',
                systemInstruction: `You are an expert SVG designer. Return ONLY valid SVG code.
                 Start with <svg and end with </svg>. No markdown, no explanation.`
            });

            const result = await model.generateContent(`Create an SVG for: ${prompt}`);
            svgCode = result.response.text() || '';

            // Strip any markdown codeblock formatting if Gemini accidentally adds it
            svgCode = svgCode.replace(/^```(xml|svg)?\n?/i, '').replace(/\n?```$/i, '').trim();

        } catch (apiError) {
            console.error("Gemini API Error:", apiError);

            // Provide a fallback SVG for demonstration if the API fails
            svgCode = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#0B0F19" />
        <circle cx="100" cy="100" r="50" fill="#0ea5e9" />
        <text x="50%" y="60%" font-family="sans-serif" font-size="20" fill="white" text-anchor="middle">API Offline</text>
      </svg>`;
        }

        // Validate output
        if (!svgCode.trim().startsWith('<svg')) {
            return res.status(500).json({ message: 'Invalid SVG generated. Please retry.' });
        }

        const saved = await Prompt.create({
            user: req.user._id,
            text: prompt,
            svgCode
        });

        res.status(201).json({ _id: saved._id, svgCode });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await Prompt.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.togglePublic = async (req, res) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });

        if (prompt.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        prompt.isPublic = !prompt.isPublic;
        await prompt.save();

        res.status(200).json(prompt);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePrompt = async (req, res) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });

        if (prompt.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await prompt.deleteOne();

        res.status(200).json({ message: 'Prompt removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
