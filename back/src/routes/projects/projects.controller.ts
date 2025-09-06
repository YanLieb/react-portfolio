import type { Request, Response } from "express";

import { saveProject, findProjects, findById, findBySlug } from '../../models/projects.model'

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
    const project = await findBySlug(slug);

    if (!project) {
      return res.status(404).json({
        error: 'Project not found'
      })
    }
    return res.status(200).render('projects/new-project', {
      project,
      scripts: '/dist/js/project-form.js',
      bodyId: `project-${project.id}`,
      bodyClasses: `update-project project-${project.id} project-${project.slug}`,
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


  add = async (req: Request, res: Response) => {
    let project = req.body;
    const slugTaken = await findBySlug(project.slug);
    
    if (slugTaken) {
      return res.status(400).json({
        error: {
          slug: 'This slug is already taken'
        }
      })
    }
    
    for (const [key, value] of Object.entries(project) as [string, any][]) {
      if (!value) {
        return res.status(400).json({
          error: {
            key: `The field ${key} is empty`
          }
        })
      }
    }

    const savedProject = await saveProject(project);
    return res.status(201).json({ savedProject, success: 'Project saved successfully' });
  }
}