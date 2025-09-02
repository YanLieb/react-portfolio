import type { Request, Response } from "express";

import { saveProject } from '../../models/projects.model'

export async function addProject(req: Request, res: Response)  {
  const project = req.body;

  if (!project.title || !project.description || !project.link) {
    return res.status(400).json({
      error: 'Missing one or more required project information'
    })
  }

  const savedProject = await saveProject(project);
  return res.status(201).json({savedProject, success: 'Project saved successfully'});
}
