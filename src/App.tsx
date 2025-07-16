import { useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { useGSAP } from '@gsap/react';


import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import PresentationComponent from './components/PresentationComponent/PresentationComponent';

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
      <HeaderComponent />
      <div id="smooth-content">
        <div className="home container">
          <PresentationComponent />
          <div className="projects-wrapper h-screen">
            test
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
