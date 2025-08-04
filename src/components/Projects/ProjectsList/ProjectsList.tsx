import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Project from "./Project/Project.tsx";
import ProjectsMenu from "./ProjectsMenu/ProjectsMenu.tsx";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type ProjectsListProps = {
  category: string;
  id: number;
}

export default function ProjectsList({ category, id }: ProjectsListProps) {
  const projectsContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!projectsContainer.current) return;

    const projects = gsap.utils.toArray<HTMLDivElement>('.project');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsContainer.current,
        start: "top top",
        end: `+=100%`,
        scrub: 1,
        pin: true,
        //markers: true,
        snap: {
          snapTo: 1 / (projects.length - 1),
          inertia: false,
          duration: { min: 0.1, max: 0.3 },
        },
      }
    });

    tl.to(projects, {
      xPercent: -100 * (projects.length - 1),
      ease: "none",
      duration: 5,
    })
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
    <div ref={projectsContainer} id={`category-${id}`} className={`projects__${category.toLowerCase()} overflow-hidden h-screen min-w-full`} >
      <div className="projects__list h-full flex">
        {getProjectsList(category)}
      </div>
      <ProjectsMenu category={category.toLowerCase()} />
    </div >
  )
}