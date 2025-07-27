import {gsap} from "gsap";
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";
import {useGSAP} from "@gsap/react";

import Project from "../Project/Project.tsx";
import * as React from "react";

type ProjectsListProps = {
	projectsContainer: React.RefObject<HTMLDivElement | null>;
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ProjectsList({projectsContainer}: ProjectsListProps) {
	useGSAP(() => {
		if (!projectsContainer.current) return;

		const menu = projectsContainer.current.querySelector('.projects__menu') as HTMLDivElement;
		const menuEntries = gsap.utils.toArray('.projects__menu-entry a') as HTMLDivElement[];


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
				start: 'top top',
				end: 'bottom center',
				scrub: true,
				//markers: true,
				pin: true,
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
			end: `bottom+=${window.innerHeight} bottom-=${projectsContainer.current.offsetHeight}`,
			scrub: true,
			//markers: true,
			pin: true,
			pinSpacing: false,
		})
	}, {scope: projectsContainer, dependencies: ['.project']})

	const getProjectsList = () => {
		const projects = [];
		for (let i = 1; i < 4; i++) {
			projects.push(
				<Project key={i} id={`project-${i}`}/>
			);
		}

		return projects;
	}

	return (
		<div className="projects__list flex flex-col items-center justify-center">
			{getProjectsList()}
		</div>
	)
}