import { ObjectId } from "mongoose";
import categoryModel from "./category.mongo";

export async function saveCategory(data: any) {
  try {
    const category = new categoryModel(data)

    return await category.save();
  } catch (err) {
    console.warn(err)
    throw err
  }
}

export async function findById(id?: ObjectId) {
  return await categoryModel.findOne({_id: id})
}

export async function findBySlug(slug: string) {
  return await categoryModel.findOne({slug})
}

export async function findCategories() {
  return await categoryModel.find()
}