import express from 'express';

import projectRouter from './project/project.router'
import categoryRouter from './category/category.router';

const api = express.Router();

api.use('/projects', projectRouter)
api.use('/categories', categoryRouter);

export default api;