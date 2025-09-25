import express from 'express';

import projectRouter from './project/project.router'
import categoryRouter from './category/category.router';

const api = express.Router();

api.use('/project', projectRouter)
api.use('/category', categoryRouter);

export default api;