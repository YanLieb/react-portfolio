import {useRef} from 'react';

import {gsap} from 'gsap';
import {ScrollTrigger, ScrollSmoother} from 'gsap/all';
import {useGSAP} from '@gsap/react';


import Header from './components/Header/Header.tsx';
import Hero from './components/Hero/Hero';
import Project from './components/Project/Project';

import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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
		for (let i = 0; i < 3; i++) {
			projects.push(
				<Project key={i}/>
			);
		}

		return projects;
	}

	const getProjectsMenu = () => {
		const projects = [];
		for (let i = 0; i < 3; i++) {
			projects.push(
				<div className="projects__menu-entry" key={i}>
					<a href="">Xca Portfolio</a>
				</div>
			);
		}
		return projects;
	}

	useGSAP(() => {
		if (!projectsList.current) return;

		const projects = gsap.utils.toArray('.project') as Element[];
		const menu = projectsList.current.querySelector('.projects__menu');

		if (!projects.length) return;

		projects.forEach((project) => {
			ScrollTrigger.create({
				trigger: project,
				start: 'top top',
				end: 'bottom center',
				scrub: true,
				markers: true,
				pin: true,
				anticipatePin: 1,
			})
		})

		ScrollTrigger.create({
			trigger: menu,
			start: `top bottom-=${menu?.offsetHeight ?? 0}`,
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
