import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Project from './Project';
import ProjectList from "./ProjectList";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CATEGORIES = ['Javascript', 'WordPress', 'Prestashop'] as const;

export default function Projects() {
  const projectsContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!projectsContainer.current) return;





  }, { scope: projectsContainer });

  const getProjects = (category: string) => {
    const projects = [];
    for (let i = 1; i < 4; i++) {
      projects.push(
        <Project key={i} id={`project-${category.toLowerCase()}-${i}`} category={category.toLowerCase()} />
      );
    }

    return projects;
  }

  const categoryData = useMemo(() =>
    CATEGORIES.map((category, index) => {
      const id = index + 1;
      const categoryLower = category.toLowerCase();

      return {
        id,
        category,
        categoryLower,
        projectsContainer: (
          <div key={id} className={`projects__${categoryLower}`}>
            {getProjects(category)}
          </div>
        ),
        projectList: (
          <ProjectList key={id} category={categoryLower} />
        ),
        menuItem: (
          <div key={id} className="projects__categories-menu__item">
            <a href={`#category-${id}`}>{category}</a>
          </div>
        )
      };
    }), []
  );

  return (
    <div ref={projectsContainer} className={`projects relative container`}>
      <div className="projects__container h-full relative">
        {categoryData.map((data) => data.projectsContainer)}
      </div>
      <div className="projects__menu">
        {categoryData.map((data) => data.projectList)}
      </div>
      <div className="projects__categories-menu top-0 w-full pb-5 flex gap-2 justify-center items-center">
        {categoryData.map((data) => data.menuItem)}
      </div>
    </div >
  )
}