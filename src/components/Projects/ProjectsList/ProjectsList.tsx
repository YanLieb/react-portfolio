import {useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";
import {useGSAP} from "@gsap/react";

import Project from "./Project/Project.tsx";
import ProjectsMenu from "./ProjectsMenu/ProjectsMenu.tsx";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type ProjectsListProps = {
	category: string;
	id: number;
}

export default function ProjectsList({category, id}: ProjectsListProps) {
	const projectsContainer = useRef<HTMLDivElement | null>(null);

	useGSAP(() => {
		if (!projectsContainer.current) return;

		const menu = projectsContainer.current.querySelector('.projects__menu') as HTMLDivElement;
		const menuEntries = gsap.utils.toArray<HTMLAnchorElement>(
			menu?.querySelectorAll('.projects__menu-entry a')
		);

		if (!menuEntries.length) return;

		menuEntries.forEach((entry) => {
			const href = entry.getAttribute('href') as string;

			const project = document.querySelector(href);

			const linkScrollTrigger = ScrollTrigger.create({
				trigger: project,
				start: "top top",
			});


			ScrollTrigger.create({
				trigger: project,
				start: 'top 30%',
				end: 'bottom top',
				scrub: true,
				//markers: true,
				pin: true,
				pinSpacing: "margin",
				anticipatePin: 1,
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
			end: `bottom+=${projectsContainer.current?.offsetHeight - menu?.offsetHeight * 2} bottom-=${menu?.offsetHeight}`,
			scrub: true,
			//markers: true,
			pin: true,
			onRefresh: self => {
				if (!projectsContainer.current) return;
				self.vars.end = `bottom+=${projectsContainer.current?.offsetHeight - menu?.offsetHeight * 2} bottom-=${menu?.offsetHeight}`
			}
		})

		ScrollTrigger.refresh();

	}, {scope: projectsContainer})

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
		<div id={`category-${id}`} ref={projectsContainer} className={`projects__${category.toLowerCase()} relative`}>
			<div className="projects__list flex flex-col items-center justify-center">
				{getProjectsList(category)}
			</div>
			<ProjectsMenu category={category.toLowerCase()}/>
		</div>
	)
}