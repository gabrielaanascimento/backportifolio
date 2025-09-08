// src/routes/technologies.js
const express = require('express');
const router = express.Router();
const technologiesRepository = require('../repositories/technologies-repositories');

// GET all technologies
router.get('/technologies', async (req, res) => {
    try {
        const technologies = await technologiesRepository.getAllTechnologies();
        res.status(200).json(technologies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET technology by ID
router.get('/technologies/:id', async (req, res) => {
    try {
        const technology = await technologiesRepository.getTechnologyById(req.params.id);
        if (technology) {
            res.status(200).json(technology);
        } else {
            res.status(404).json({ error: 'Technology not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new technology
router.post('/technologies', async (req, res) => {
    try {
        const newTechnology = await technologiesRepository.createTechnology(req.body);
        res.status(201).json(newTechnology);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update technology by ID
router.put('/technologies/:id', async (req, res) => {
    try {
        const updatedTechnology = await technologiesRepository.updateTechnology(req.params.id, req.body);
        if (updatedTechnology) {
            res.status(200).json(updatedTechnology);
        } else {
            res.status(404).json({ error: 'Technology not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE technology by ID
router.delete('/technologies/:id', async (req, res) => {
    try {
        const deleted = await technologiesRepository.deleteTechnology(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Technology not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;