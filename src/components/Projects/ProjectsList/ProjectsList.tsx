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

    // const wrapper = gsap.utils.wrap(0, projects.length);
    // let isAnimating = false;
    // let currentIndex = 0;
    // let lastIndex = projects.length - 1;

    // gsap.set(projects, { xPercent: -100 });
    // gsap.set(projects[0], { xPercent: 0 });

    // function slideProjects(index: number, direction: number) {
    //   isAnimating = true;
    //   currentIndex = wrapper(index);

    //   const currentProject = projects[currentIndex];
    //   const nextProject = projects[index];

    //   gsap.set(currentProject, { zIndex: 1, autoAlpha: 1 });
    //   gsap.set(nextProject, { zIndex: 2, autoAlpha: 1 });

    //   console.log(nextProject);

    //   const tl = gsap.timeline({
    //     defaults: {
    //       ease: "power2.inOut",
    //       duration: 1
    //     },
    //     onComplete: () => {
    //       isAnimating = false;
    //     }
    //   });

    //   tl
    //     .fromTo(currentProject, {
    //       xPercent: 0,
    //     }, {
    //       xPercent: -100 * direction,
    //     }, 0)
    //     .fromTo(nextProject, {
    //       xPercent: 100 * direction,
    //     }, {
    //       xPercent: 0,
    //     }, 0);

    //   currentIndex = index;
    // }

    // function observe() {
    //   ScrollTrigger.observe({
    //     target: projectsContainer.current,
    //     type: 'wheel,touch',
    //     onDown: () => {
    //       if (isAnimating) return;
    //       if (currentIndex === lastIndex) return;
    //       slideProjects(currentIndex + 1, +1)
    //     },
    //     onUp: () => {
    //       if (isAnimating) return;
    //       if (currentIndex === 0) return;
    //       slideProjects(currentIndex - 1, -1)
    //     }
    //   })
    // }

    // ScrollTrigger.create({
    //   trigger: projectsContainer.current,
    //   start: "top top",
    //   end: `+=100% * ${projects.length * projects.length}`,
    //   onEnter: () => {
    //     observe();
    //   },
    //   onLeaveBack: () => {
    //     observe();
    //   },
    //   pin: true,
    //   scrub: 1,
    //   markers: true,
    // })

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
    <div ref={projectsContainer} id={`category-${id}`} className={`projects__${category.toLowerCase()} overflow-hidden h-screen`}>
      <div className="projects__list h-full flex">
        {getProjectsList(category)}
      </div>
      <ProjectsMenu category={category.toLowerCase()} />
    </div>
  )
}