import {useRef} from 'react';

import {gsap} from 'gsap';
import {ScrollTrigger, ScrollSmoother} from 'gsap/all';
import {useGSAP} from '@gsap/react';


import Header from './components/Header/Header.tsx';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';

import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
	const mainContainer = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		ScrollSmoother.create({
			smooth: 1.5,
			effects: true,
			smoothTouch: 0.2
		})
	}, {scope: mainContainer})

	const contactLinks = {
		'linkedIn': 'https://www.linkedin.com/in/yannickliebnau/',
		'Github': 'https://github.com/YanLieb'
	}


	return (
		<div ref={mainContainer} id="smooth-wrapper">
			<Header/>
			<div id="smooth-content">
				<div className="home relative">
					<Hero/>
					<Projects/>
					<div className="contact">
						<div className="contact__container h-screen mt-[70px] container">
							<div className="contact__links flex flex-col items-center justify-center h-full">
								{contactLinks && Object.entries(contactLinks).map(([name, link]) => (
										<div className="contact__link" key={name}>
											<a href={link} target="_blank" rel="noopener noreferrer">
												{name}
											</a>
										</div>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
