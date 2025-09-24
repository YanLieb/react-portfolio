import express from 'express';

import Project from './projects.controller';

const projectController = new Project;
const projectsRouter = express.Router();

projectsRouter.get('/new', projectController.getNew)
projectsRouter.get("/:slug", projectController.get)
projectsRouter.get('/', projectController.getAll)

projectsRouter.post('/', projectController.add)

export default projectsRouter;