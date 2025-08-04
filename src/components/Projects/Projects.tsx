import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";

import ProjectsList from "./ProjectsList/ProjectsList";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Projects() {
  const categoriesContainer = useRef<HTMLDivElement | null>(null);

  const categories = ['Javascript', 'WordPress', 'Prestashop'] as string[];

  useGSAP(() => {
    if (!categoriesContainer.current) return;





  }, { scope: categoriesContainer });


  return (
    <div ref={categoriesContainer} className={`projects relative container`}>
      {
        categories.map((category, index) => {
          const id = index + 1;
          return (
            <ProjectsList key={id} category={category.toLowerCase()} id={id} />
          )
        }
        )
      }
      {/* <div className="projects__categories-menu absolute top-0 w-full pb-5 flex gap-2 justify-center items-center">
        {categories.map((category, index) => {
          const id = index + 1;

          return (
            <div key={id} className="projects__categories-menu__item">
              <a href={`#category-${id}`}>{category}</a>
            </div>
          )
        })
        }
      </div> */}
    </div >
  )
}