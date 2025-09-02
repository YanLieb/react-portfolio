import express from 'express';
import { Request, Response } from 'express';

import { addProject } from './projects.controller';

const projectsRouter = express.Router();

projectsRouter.get('/new', (req: Request, res: Response) => {
  res.render('projects/new-project', {
    layout: 'layout',
    title: 'Create a new project',
    scripts: '/js/project-form.js'
  })
})

projectsRouter.post('/', addProject)

export default projectsRouter;