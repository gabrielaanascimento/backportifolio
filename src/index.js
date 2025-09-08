// src/index.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('./routes/login');
const projectsRouter = require('./routes/projects');
const technologiesRouter = require('./routes/technologies');
const skillsRouter = require('./routes/skills');
const aboutMeRouter = require('./routes/about-me');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas da API
app.use('/api', loginRouter);
app.use('/api', projectsRouter);
app.use('/api', technologiesRouter);
app.use('/api', skillsRouter);
app.use('/api', aboutMeRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});