import express from 'express';
import { Request, Response } from 'express';

import Project from './projects.controller';

const project = new Project;
const projectsRouter = express.Router();

projectsRouter.get('/new', project.getNew)
projectsRouter.get("/:slug", project.get)
projectsRouter.get('/', project.getAll)

projectsRouter.post('/', project.add)

export default projectsRouter;