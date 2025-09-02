import express from 'express';

import projectsRouter from './projects/projects.router'

const api = express.Router();

api.use('/projects', projectsRouter)

export default api;