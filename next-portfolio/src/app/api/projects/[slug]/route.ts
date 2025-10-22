import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ZodError } from 'zod';
import Project from '@/models/Project';
import { projectSchema } from '@/schemas/project.schema';

export async function PATCH(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();

    const body = await request.json();
    const validateData = projectSchema.parse(body);

    const project = await Project.findOneAndUpdate({slug: params.slug }, validateData)

    return NextResponse.json(
      { message: 'Project updated successfully', project },
      { status: 200 }
    );
  }
  catch (error: any) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const errors = error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      );
    }

    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();

  const { slug } = params;
  const project = await Project.findOne({ slug });

  if (!project) {
    return Response.json({ error: 'No project with this slug' }, { status: 404 });
  }
  return Response.json(project);
  
}