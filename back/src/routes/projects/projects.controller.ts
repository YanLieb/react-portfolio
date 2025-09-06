import type { Request, Response } from "express";

import { saveProject, findProjects, findProject } from '../../models/projects.model'

export default class Project {
  async getNew(req: Request, res: Response) {
    res.render('projects/new-project', {
      title: 'Create a new project',
      scripts: '/dist/js/project-form.js',
      bodyId: 'new-project',
      bodyClasses: 'new-project project'
    })
  }

  async get(req: Request, res: Response) {
    const { slug } = req.params;
    const project = await findProject(slug);

    if (!project) {
      return res.status(404).json({
        error: 'Project not found'
      })
    }
    return res.status(200).render('projects/new-project', {
      project,
      scripts: '/dist/js/project-form.js',
      bodyId: `project-${project.id}`,
      bodyClasses: `update-project project-${project.id} project-${project.slug}`
    })
  }

  async getAll(req: Request, res: Response) {
    const projects = await findProjects();

    if (!projects.length) {
      return res.status(400).json({
        error: 'No Projects found'
      })
    }

    res.render('projects', {
      title: 'All projects',
      projects
    })
  }

  async add(req: Request, res: Response) {
    const project = req.body;
    console.log(req.body)

    if (!project.title || !project.description || !project.link || !project.slug) {
      return res.status(400).json({
        error: 'Missing one or more required project information'
      })
    }

    const savedProject = await saveProject(project);
    return res.status(201).json({ savedProject, success: 'Project saved successfully' });
  }
}