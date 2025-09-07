import express from 'express';

import projectsRouter from './projects/projects.router'
import categoriesRouter from './categories/categories.router';

const api = express.Router();

api.use('/projects', projectsRouter)
api.use('/categories', categoriesRouter);

export default api;