import mongoose from "mongoose";
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true},
  description: { type: String, required: true },
  link: { type: String, required: true }
})

export default model('Project', projectSchema);