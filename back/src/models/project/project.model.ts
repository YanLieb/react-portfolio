import { ObjectId } from "mongoose";
import projectModel from "./project.mongo";

export async function saveProject(data: any) {
  try {
    const project = new projectModel(data)

    return await project.save();
  } catch (err) {
    console.warn(err)
    throw err
  }
}

export async function findById(id?: ObjectId) {
  return await projectModel.findOne({_id: id}).populate('categories')
}

export async function findBySlug(slug: string) {
  return await projectModel.findOne({ slug }).populate('categories')
}

export async function findProjects() {
  return await projectModel.find()
}