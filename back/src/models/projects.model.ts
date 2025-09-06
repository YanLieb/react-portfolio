import projectModel from "./projects.mongo";

export async function saveProject(data: any) {
  try {
    data.slug = await checkSlug(data.slug);

    const project = new projectModel(data)

    return await project.save();
  } catch (err) {
    console.warn(err)
    throw err
  }
}

async function checkSlug(slug: string) {
  let uniqueSlug = slug;
  let counter = 1;

  while (await findProject(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

export async function findProject(slug: string) {
  return await projectModel.findOne({slug})
}

export async function findProjects() {
  return await projectModel.find()
}