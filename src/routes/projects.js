// src/routes/projects.js
const express = require('express');
const router = express.Router();
const projectsRepository = require('../repositories/projects-repositories');


// GET all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await projectsRepository.getAllProjects();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET project by ID
router.get('/projects/:id', async (req, res) => {
    try {
        const project = await projectsRepository.getProjectById(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new project
router.post('/projects', async (req, res) => {
    try {
        const newProject = await projectsRepository.createProject(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update project by ID
router.put('/projects/:id', async (req, res) => {
    try {
        const updatedProject = await projectsRepository.updateProject(req.params.id, req.body);
        if (updatedProject) {
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE project by ID
router.delete('/projects/:id', async (req, res) => {
    try {
        const deleted = await projectsRepository.deleteProject(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;