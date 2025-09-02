import projectModel from "./projects.mongo";

export async function saveProject(data: JSON) {
  try {
    const project = new projectModel(data)
    
    if (!project) throw new Error('No project to save')
    
    const savedProject = await projectModel.findOneAndUpdate({
      title: project.title
    }, project, {
      upsert: true,
      new: true
    })

    console.log(`Project ${project.title} saved`)
    return savedProject;
    
  } catch (err) {
    console.warn(err)
    throw err
  }
}