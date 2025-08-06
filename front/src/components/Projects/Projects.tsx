import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Project from './Project';
import ProjectList from "./ProjectList";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CATEGORIES = ['JavaScript', 'WordPress', 'PrestaShop'] as const;

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
        isActive: category === "JavaScript" ? true : false,
        projectsContainer: (
          <div key={id} className={`projects__${categoryLower} h-full`}>
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
    <div ref={projectsContainer} className={`projects relative container h-screen border border-slate-400`}>
      {categoryData.map((data) => data.isActive && data.projectsContainer)}

      <div className="projects__categories-menu flex gap-1 md:gap-2 absolute bottom-5 w-full flex-col md:flex-row md:justify-center md:items-center">
        {categoryData.map((data) => data.menuItem)}
      </div>
      {categoryData.map((data) => data.isActive && data.projectList)}
    </div>
  )
}