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

			gsap.fromTo(category, {
				opacity: 0,
			}, {
				opacity: 1,
				scrollTrigger: {
					trigger: category,
					start: 'top center',
					end: 'bottom center',
					toggleActions: 'play none none reverse',
					//markers: true,
					anticipatePin: 1,
					onToggle: self => self.isActive,
				}
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
			scrub: true,
			//markers: true,
			pin: true,
			onRefresh: self => {
				self.vars.end = `bottom+=${categoriesContainer.current?.offsetHeight + menu?.offsetHeight} bottom-=${menu?.offsetHeight}`
			}
		})

		ScrollTrigger.refresh()

	}, {scope: categoriesContainer});


	return (
		<div ref={categoriesContainer} className={`projects relative container`}>
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