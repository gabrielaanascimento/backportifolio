// src/routes/about-me.js
const express = require('express');
const router = express.Router();
const aboutMeRepository = require('../repositories/about-me-repositories');

// GET about me
router.get('/about-me', async (req, res) => {
    try {
        const aboutMe = await aboutMeRepository.getAboutMe();
        if (aboutMe) {
            res.status(200).json(aboutMe);
        } else {
            res.status(404).json({ error: 'About me data not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update about me
router.put('/about-me', async (req, res) => {
    try {
        const updatedAboutMe = await aboutMeRepository.updateAboutMe(req.body);
        if (updatedAboutMe) {
            res.status(200).json(updatedAboutMe);
        } else {
            res.status(404).json({ error: 'About me data not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;