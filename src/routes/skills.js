// src/routes/skills.js
const express = require('express');
const router = express.Router();
const skillsRepository = require('../repositories/skills-repositories');

// GET all skills
router.get('/skills', async (req, res) => {
    try {
        const skills = await skillsRepository.getAllSkills();
        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET skill by ID
router.get('/skills/:id', async (req, res) => {
    try {
        const skill = await skillsRepository.getSkillById(req.params.id);
        if (skill) {
            res.status(200).json(skill);
        } else {
            res.status(404).json({ error: 'Skill not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new skill
router.post('/skills', async (req, res) => {
    try {
        const newSkill = await skillsRepository.createSkill(req.body);
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update skill by ID
router.put('/skills/:id', async (req, res) => {
    try {
        const updatedSkill = await skillsRepository.updateSkill(req.params.id, req.body);
        if (updatedSkill) {
            res.status(200).json(updatedSkill);
        } else {
            res.status(404).json({ error: 'Skill not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE skill by ID
router.delete('/skills/:id', async (req, res) => {
    try {
        const deleted = await skillsRepository.deleteSkill(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Skill not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;