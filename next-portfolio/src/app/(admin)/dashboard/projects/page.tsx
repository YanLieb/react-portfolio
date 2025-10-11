"use client"

import { useSearchParams } from "next/navigation"
import ProjectForm from './_components/ProjectForm'
import ProjectList from './_components/ProjectList'

export default function Projects() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const slug = searchParams.get('slug');
  
  return mode ? <ProjectForm mode={mode} slug={slug} /> : <ProjectList />;
}