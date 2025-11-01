import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProjectInterface } from '@/models/Project';
import { Button } from '@/components/Button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"


interface ProjectList_ProjectInterface extends ProjectInterface {
  _id: string;
}

export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {

        const response = await fetch(`/api/projects/`)

        if (!response.ok) throw new Error('Failed to fetch projects')

        const data = await response.json();

        setProjectList(data.projects);
      } catch (err) {
        console.error('error fetching project list : ', err)
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects()
  }, [])

  return (
    <>
      <h1 className="my-4 text-center text-xl font-bold">Project List</h1>
      <div className="flex justify-end mb-5">
        <Button className="">
          <Link href="?mode=new">Add project</Link>
        </Button>
      </div>
      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Project title</TableHeaderCell>
              <TableHeaderCell className='flex gap-4 justify-end'>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectList.length > 0 && projectList.map((project: ProjectList_ProjectInterface) => (
              <TableRow key={project._id}>
                <TableCell>{project.title}</TableCell>
                <TableCell className='flex gap-4 justify-end'>
                  <Button variant="secondary" isLoading={isLoading} asChild>
                    <Link href={`?mode=edit&slug=${project.slug}`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" isLoading={isLoading} asChild>
                    <Link href={`?mode=delete&slug=${project.slug}`}>Delete</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </>
  )
}