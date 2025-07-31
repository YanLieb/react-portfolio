import { useRef } from "react";
import { gsap } from "gsap";
import { Observer, ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";

import Project from "./Project/Project.tsx";
import ProjectsMenu from "./ProjectsMenu/ProjectsMenu.tsx";

gsap.registerPlugin(Observer, ScrollToPlugin);

type ProjectsListProps = {
  category: string;
  id: number;
}

export default function ProjectsList({ category, id }: ProjectsListProps) {
  const projectsContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!projectsContainer.current) return;

    const projects = gsap.utils.toArray<HTMLDivElement>(
      projectsContainer.current.querySelectorAll(".project")
    );

    const observer = Observer.create({
      target: projectsContainer.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
    });

  }, { scope: projectsContainer })

  const getProjectsList = (category: string) => {
    const projects = [];
    for (let i = 1; i < 4; i++) {
      projects.push(
        <Project key={i} id={`project-${category.toLowerCase()}-${i}`} category={category.toLowerCase()} />
      );
    }

    return projects;
  }

  return (
    <div ref={projectsContainer} id={`category-${id}`} className={`projects__${category.toLowerCase()} relative h-screen overflow-hidden`}>
      <div className="projects__list flex h-full">
        {getProjectsList(category)}
      </div>
      <ProjectsMenu category={category.toLowerCase()} />
    </div>
  )
}