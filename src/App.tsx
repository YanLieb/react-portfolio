import { useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { useGSAP } from '@gsap/react';

import { textApparitionAnim } from './animations';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1
    })

    textApparitionAnim('h1', 'h2', '.description');

  }, { scope: container })

  return (
    <div ref={container} id="smooth-wrapper">
      <div id="smooth-content">
        <div className="home container h-screen relative">
          <div className="content-wrapper h-screen flex flex-col justify-center items-center">
            <h1>Yannick Liebnau</h1>
            <h2 className="mb-3">Web Developer</h2>
            <div className="description relative w-100 text-center">
              <p>JavaScript / NodeJS / React</p>
              <p>Prestashop / WordPress</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default App
