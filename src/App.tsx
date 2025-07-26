import {useRef} from 'react';

import {gsap} from 'gsap';
import {ScrollTrigger, ScrollSmoother, ScrollToPlugin} from 'gsap/all';
import {useGSAP} from '@gsap/react';


import Header from './components/Header/Header.tsx';
import Hero from './components/Hero/Hero';
import Project from './components/Project/Project';

import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

function App() {
	const mainContainer = useRef<HTMLDivElement>(null);
	const projectsList = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		ScrollSmoother.create({
			smooth: 1.5,
			effects: true,
			smoothTouch: 0.2
		})
	}, {scope: mainContainer})


	const getProjectsList = () => {
		const projects = [];
		for (let i = 1; i < 4; i++) {
			projects.push(
				<Project key={i} id={`project-${i}`}/>
			);
		}

		return projects;
	}

	const getProjectsMenu = () => {
		const menu = [];
		for (let i = 1; i < 4; i++) {
			menu.push(
				<div className="projects__menu-entry" key={i}>
					<a href={`#project-${i}`}>Xca Portfolio</a>
				</div>
			);
		}
		return menu;
	}

	useGSAP(() => {
		if (!projectsList.current) return;

		const menu = projectsList.current.querySelector('.projects__menu') as HTMLDivElement;
		const menuEntries = gsap.utils.toArray('.projects__menu-entry a') as HTMLDivElement[];

		console.log(menuEntries);

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
			end: `bottom+=${window.innerHeight} bottom-=${projectsList.current.offsetHeight}`,
			scrub: true,
			//markers: true,
			pin: true,
			pinSpacing: false,
		})


	}, {scope: projectsList, dependencies: ['.project']})

	return (
		<div ref={mainContainer} id="smooth-wrapper">
			<Header/>
			<div id="smooth-content">
				<div className="home container relative">
					<Hero/>

					<div className="projects">
						<div ref={projectsList} className="projects__list relative flex flex-col items-center justify-center">
							<div className="projects__menu absolute pb-5 top-5 right-0 flex flex-col gap-2 text-right">
								{getProjectsMenu()}
							</div>
							{getProjectsList()}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
