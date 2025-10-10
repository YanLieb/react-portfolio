import mongoose, { Schema, model, models } from 'mongoose';

export interface IProject {
  title: string;
  slug: string;
  description: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a project slug'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'Please provide a project link'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model compilation error in development
const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
