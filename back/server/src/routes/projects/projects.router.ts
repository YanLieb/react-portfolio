import express from 'express';
import { Request, Response } from 'express';

import { addProject, getProjects } from './projects.controller';

const projectsRouter = express.Router();

projectsRouter.get('/', getProjects)

projectsRouter.get('/new', (req: Request, res: Response) => {
  res.render('projects/new-project', {
    title: 'Create a new project',
    scripts: '/js/project-form.js'
  })
})

projectsRouter.get("/:id", (req: Request, res: Response) => {
  res.render('')
})

projectsRouter.post('/', addProject)

export default projectsRouter;