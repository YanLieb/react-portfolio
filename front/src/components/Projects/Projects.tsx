import { useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Project from './Project';
import ProjectList from "./ProjectList";

const CATEGORIES = ['JavaScript', 'WordPress', 'PrestaShop'] as const;

gsap.registerPlugin(Observer, SplitText);
export default function Projects() {
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
          <div key={id} className={`projects__${categoryLower} h-full`}>
            {getProjects(category)}
          </div>
        ),
        projectList: (
          <ProjectList key={id} category={categoryLower} />
        ),
        menuItem: (
          <div key={id} className="projects__categories-menu__item">
            <a href={`#category-${id}`} onClick={setActiveCategory(id)}>{category}</a>
          </div>
        )
      };
    }), [activeCategoryId]
  );


  useGSAP(() => {
    if (!projectsContainer.current) return;

    const projects = gsap.utils.toArray<HTMLDivElement>('.project');
    const wrap = gsap.utils.wrap(0, projects.length);
    let currentIndex = 0;
    let isAnimating = false;

    gsap.set(projects, { xPercent: 100 });
    gsap.set(projects[0], { xPercent: 0 });
    gsap.set(projects[0]?.querySelector('.project__title'), { autoAlpha: 1 });
    gsap.set(projects[0]?.querySelector('.project__body'), { autoAlpha: 1 });

    const slide = (followingIndex: number) => {
      followingIndex = wrap(followingIndex);
      isAnimating = true;

      const totalSlides = projects.length;
      const forwardDistance = (followingIndex - currentIndex + totalSlides) % totalSlides;
      const backwardDistance = (currentIndex - followingIndex + totalSlides) % totalSlides;
      const shouldGoForward = forwardDistance <= backwardDistance;
      const calculatedDirection = shouldGoForward ? -1 : 1;

      const currentProject = projects[currentIndex];
      const currentTitle = currentProject?.querySelector('.project__title');
      const currentBody = currentProject?.querySelector('.project__body');

      const followingProject = projects[followingIndex];
      const followingProjectTitle = followingProject?.querySelector('.project__title');
      const followingProjectBody = followingProject?.querySelector('.project__body');

      if (!currentProject || !followingProject) {
        console.warn("No project found");
        isAnimating = false;
        return;
      }

      const splitCurrentTitle = new SplitText(currentTitle, { type: "words" });
      const splitCurrentBody = new SplitText(currentBody, { type: "lines" });
      const splitFollowingTitle = new SplitText(followingProjectTitle, { type: "words" });
      const splitFollowingBody = new SplitText(followingProjectBody, { type: "lines" });

      gsap.set(followingProject, {
        xPercent: calculatedDirection === -1 ? 100 : -100
      });
      gsap.set(splitFollowingTitle.words, {
        y: -50,
        autoAlpha: 0
      });
      gsap.set(splitFollowingBody.lines, {
        x: shouldGoForward ? 50 : -50,
        autoAlpha: 0
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "back.inOut(1.7)"
        },
        onComplete: () => {
          splitCurrentTitle.revert();
          splitCurrentBody.revert();
          splitFollowingTitle.revert();
          splitFollowingBody.revert();

          currentIndex = followingIndex;
          isAnimating = false;
        }
      })

      tl
        .to(splitCurrentTitle.words, {
          y: -50,
          autoAlpha: 0,
          stagger: 0.1
        })
        .to(splitCurrentBody.lines, {
          x: shouldGoForward ? -50 : 50,
          autoAlpha: 0,
          stagger: 0.1
        }, "<")
        .to(currentProject, {
          xPercent: 100 * calculatedDirection,
        })
        .to(followingProject, {
          xPercent: 0
        }, "<")
        .to(splitFollowingTitle.words, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1
        })
        .to(splitFollowingBody.lines, {
          x: 0,
          autoAlpha: 1,
          stagger: 0.1
        }, "<")
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

        const menuEntries = document.querySelectorAll('.project-list .projects__list-item');
        menuEntries.forEach((entry, index) => {
          if (target.closest('.projects__list-item') === entry) {
            if (index === currentIndex) return;

            slide(index);
          }
        });
      }
    });

  }, { scope: projectsContainer, dependencies: [activeCategoryId] });

  console.log(categoryData)

  return (
    <div ref={projectsContainer} className={`projects relative z-0 container h-screen overflow-hidden`}>
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