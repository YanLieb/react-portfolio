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


	return (
		<div ref={mainContainer} id="smooth-wrapper">
			<Header/>
			<div id="smooth-content">
				<div className="home container relative">
					<Hero/>
					<Projects/>
				</div>
			</div>
		</div>
	)
}

export default App
