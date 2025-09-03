import projectModel from "./projects.mongo";

export async function saveProject(data: any) {
  try {
    const project = new projectModel(data)
    return await project.save();
  } catch (err) {
    console.warn(err)
    throw err
  }
}

export async function findProjects() {
  return await projectModel.find()
}