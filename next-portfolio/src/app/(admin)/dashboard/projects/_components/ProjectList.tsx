import { useEffect, useState } from 'react';
import { projectSchema } from '@/schemas/project.schema';


export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`/api/projects/`)

      if (!response.ok) throw new Error('Failed to fetch projects')

      const data = await response.json();

      setProjectList(data.projects);
    }

    fetchProjects()
  }, [])

  if (projectList.length) console.log(projectList);

  return 'Project list'
}