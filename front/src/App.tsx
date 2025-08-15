import { useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { useGSAP } from '@gsap/react';


import Header from './components/Header/Header.tsx';
import Hero from './components/Hero/Hero.tsx';
import ProjectsList from './components/Projects/ProjectsList.tsx';
import Contact from './components/Contact/Contact.tsx';

import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const mainContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.2
    })
  }, { scope: mainContainer })

  return (
    <div ref={mainContainer} id="smooth-wrapper">
      <Header />
      <div id="smooth-content" className="home relative">
        <Hero />
        <ProjectsList />
        <Contact />
      </div>
    </div>
  )
}