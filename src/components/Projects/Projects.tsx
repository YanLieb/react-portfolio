import {useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";
import {useGSAP} from "@gsap/react";

import ProjectsList from "./ProjectsList/ProjectsList";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Projects() {
	const categoriesContainer = useRef<HTMLDivElement | null>(null);

	const categories = ['Javascript', 'WordPress', 'Prestashop'] as string[];

	useGSAP(() => {
		if (!categoriesContainer.current) return;

		const menu = categoriesContainer.current.querySelector(".projects__categories-menu") as HTMLDivElement;

		if (!menu) return;

		const menuEntries = gsap.utils.toArray<HTMLAnchorElement>(menu.querySelectorAll(".projects__categories-menu__item a"));

		menuEntries.forEach((entry) => {
			const href = entry.getAttribute('href') as string;

			const category = document.querySelector(href);

			const linkScrollTrigger = ScrollTrigger.create({
				trigger: category,
				start: "top top",
			});

			ScrollTrigger.create({
				trigger: category,
				start: 'top top',
				end: 'bottom top',
				markers: true,
				onToggle: self => self.isActive
			})

			entry.addEventListener('click', e => {
				e.preventDefault();

				gsap.to(window, {
					duration: 1,
					scrollTo: linkScrollTrigger.start,
					overwrite: 'auto',
				})
			})
		})

		ScrollTrigger.create({
			trigger: menu,
			start: `top bottom-=${menu?.offsetHeight}`,
			end: `bottom+=${categoriesContainer.current?.offsetHeight - menu?.offsetHeight * 2} bottom-=${menu?.offsetHeight}`,
			scrub: true,
			//markers: true,
			pin: true,
			pinSpacing: false,
		})

	}, {scope: categoriesContainer});


	return (
		<div ref={categoriesContainer} className={`projects relative`}>
			{categories.map((category, index) => {
					const id = index + 1;
					return (
						<ProjectsList key={id} category={category.toLowerCase()} id={id}/>
					)
				}
			)}
			<div className="projects__categories-menu absolute top-0 w-full pb-5 flex gap-2 justify-center items-center">
				{categories.map((category, index) => {
					const id = index + 1;

					return (
						<div key={id} className="projects__categories-menu__item">
							<a href={`#category-${id}`}>{category}</a>
						</div>
					)
				})
				}
			</div>
		</div>
	)
}