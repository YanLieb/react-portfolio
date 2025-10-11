import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function POST(
  request: Request,
  {params}: {params: Promise<{slug: string}>}
) {
  
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();

  const { slug } = await params;
  const project = await Project.findOne({ slug });

  if (!project) {
    return Response.json({ error: 'No project with this slug' }, { status: 404 });
  }
  return Response.json(project);
  
}