import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import Project from './Project';
import ProjectList from "./ProjectList";

const CATEGORIES = ['JavaScript', 'WordPress', 'PrestaShop'] as const;

gsap.registerPlugin(Observer);
export default function Projects() {
  const projectsContainer = useRef<HTMLDivElement | null>(null);


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

  useGSAP(() => {
    if (!projectsContainer.current) return;

    const projects = gsap.utils.toArray<HTMLDivElement>('.project');
    const wrap = gsap.utils.wrap(0, projects.length);
    let currentIndex = 0;
    let isAnimating = false;


    gsap.set(projects, { xPercent: 100 })
    gsap.set(projects[0], { xPercent: 0 });

    const slide = (followingIndex: number) => {
      followingIndex = wrap(followingIndex);

      const totalSlides = projects.length;
      const forwardDistance = (followingIndex - currentIndex + totalSlides) % totalSlides;
      const backwardDistance = (currentIndex - followingIndex + totalSlides) % totalSlides;

      const shouldGoForward = forwardDistance <= backwardDistance;
      const calculatedDirection = shouldGoForward ? -1 : 1;

      isAnimating = true;
      const currentProject = projects[currentIndex];
      const followingProject = projects[followingIndex];

      gsap.set(followingProject, {
        xPercent: calculatedDirection === -1 ? 100 : -100
      });

      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "expo.inOut"
        },
        onComplete: () => {
          currentIndex = followingIndex;
          isAnimating = false;
        }
      })

      tl
        .to(currentProject, {
          xPercent: 100 * calculatedDirection,
        })
        .to(followingProject, {
          xPercent: 0
        }, 0);
    }

    Observer.create({
      target: projectsContainer.current,
      type: "pointer",
      onRight: () => {
        if (isAnimating) return;
        slide(currentIndex - 1);
      },
      onLeft: () => {
        if (isAnimating) return;
        slide(currentIndex + 1);
      },
      onClick: (self) => {
        if (isAnimating) return;

        const target = self.event.target as HTMLElement;

        if (target.closest('.projects__next-btn')) {
          slide(currentIndex + 1);
        } else if (target.closest('.projects__prev-btn')) {
          slide(currentIndex - 1);
        }
      }
    });

  }, { scope: projectsContainer });


  return (
    <div ref={projectsContainer} className={`projects relative container h-screen border border-slate-400 overflow-hidden`}>
      <div className="projects__prev-btn absolute top-1/2 start-2 -translate-y-1/2 z-10 cursor-pointer">prev</div>
      {categoryData.map((data) => data.isActive && data.projectsContainer)}
      <div className="projects__next-btn absolute top-1/2 end-2 -translate-y-1/2 z-10 cursor-pointer">next</div>
      <div className="projects__categories-menu flex gap-1 md:gap-2 absolute bottom-5 w-full flex-col md:flex-row md:justify-center md:items-center">
        {categoryData.map((data) => data.menuItem)}
      </div>
      {categoryData.map((data) => data.isActive && data.projectList)}
    </div>
  )
}