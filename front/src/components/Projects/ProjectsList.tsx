import { useRef, useMemo, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Project from './Project';
import ProjectsMenu from "./ProjectsMenu";
import projectsListSlider from "./inc/projectsListSlider";

const CATEGORIES = ['JavaScript', 'WordPress', 'PrestaShop'] as const;

gsap.registerPlugin(ScrollTrigger);
export default function ProjectsList() {
  const projectsContainer = useRef<HTMLDivElement | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState(1);

  const getProjects = (category: string) => {
    const projects = [];
    for (let i = 1; i < 4; i++) {
      projects.push(
        <Project key={i} id={`project-${category.toLowerCase()}-${i}`} category={category.toLowerCase()} />
      );
    }

    return projects;
  }

  const setActiveCategory = (categoryId: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveCategoryId(categoryId);
  }

  const categoryData = useMemo(() =>
    CATEGORIES.map((category, index) => {
      const id = index + 1;
      const categoryLower = category.toLowerCase();

      return {
        id,
        category,
        categoryLower,
        isActive: activeCategoryId === id,
        projectsContainer: (
          <div key={id} className={`projects__list projects__${categoryLower} h-full`}>
            {getProjects(category)}
          </div>
        ),
        projectList: (
          <ProjectsMenu key={id} category={categoryLower} />
        ),
        menuItem: (
          <div key={id} className="projects__categories-menu__item">
            {activeCategoryId === id ? (
              <span className="active-category">{category}</span>
            ) : (
              <a href={`#category-${id}`} onClick={setActiveCategory(id)}>{category}</a>
            )}
          </div>
        )
      };
    }), [activeCategoryId]
  );

  useGSAP(() => {
    projectsListSlider(projectsContainer.current);

    gsap.set(".projects__categories-menu__item, .projects__menu-item, .project__container,.projects__prev-btn, .projects__next-btn", {
      autoAlpha: 0,
    });

    gsap.to(".projects__categories-menu__item", {
      autoAlpha: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".projects__categories-menu",
        start: "top 95%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      }
    })

    gsap.to(".projects__menu-item", {
      autoAlpha: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".projects__menu",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      }
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".project__container",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    tl
      .to(".project__container", {
        autoAlpha: 1,
      })
      .fromTo(".projects__next-btn, .projects__prev-btn", {
        y: 50,
      }, {
        autoAlpha: 1,
        y: 0
      }, "<")

  }, { scope: projectsContainer, dependencies: [activeCategoryId] });

  return (
    <div ref={projectsContainer} className={`projects relative z-0 container h-screen overflow-hidden`}>
      <div className="projects__prev-btn absolute left-2/3 top-4/5 md:top-1/2 md:start-2 md:-translate-y-1/2 z-10 cursor-pointer">prev</div>
      {categoryData.map((data) => data.isActive && data.projectsContainer)}
      <div className="projects__next-btn absolute right-2/3 top-4/5 md:top-1/2 md:end-2 md:-translate-y-1/2 z-10 cursor-pointer">next</div>
      <div className="projects__categories-menu flex gap-1 md:gap-2 absolute bottom-5 w-full flex-col md:flex-row md:justify-center md:items-center">
        {categoryData.map((data) => data.menuItem)}
      </div>
      {categoryData.map((data) => data.isActive && data.projectList)}
    </div>
  )
}
