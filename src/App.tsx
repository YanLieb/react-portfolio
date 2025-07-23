import { useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { useGSAP } from '@gsap/react';


import Header from './components/Header/Header.tsx';
import Hero from './components/Hero/Hero';

import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1
    })
  }, { scope: container })

  return (
    <div ref={container} id="smooth-wrapper">
      <Header />
      <div id="smooth-content">
        <div className="home container">
          <Hero />
          <div className="projects-wrapper h-screen">
            test
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
