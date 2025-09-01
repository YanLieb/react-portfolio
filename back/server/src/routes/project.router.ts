import express from 'express';

import { addProject } from './project.controller';

const projectRouter = express.Router();

projectRouter.post('/', addProject)

export default projectRouter;