import { useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother, MorphSVGPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

import { textApparitionAnim } from './animations';

import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MorphSVGPlugin)
function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1
    })

    const entries = gsap.utils.toArray(".menu-entry")

    if (entries && entries.length > 0) {
      entries.forEach(entry => {
        const el = entry as HTMLElement;
        const entryTop = (entries[0] as HTMLElement).getBoundingClientRect().top

        gsap.to(el, {
          x: "-500px",
          scrollTrigger: {
            trigger: el,
            start: `bottom ${entryTop}`,
            end: `${window.innerHeight} top`,
            markers: true,
          }
        })
      })
    }

    textApparitionAnim('h1', 'h2', '.description');

  }, { scope: container })

  return (
    <div ref={container} id="smooth-wrapper">
      <div id="smooth-content">
        <div className="home container h-[200svh]">
          <div className="content-wrapper h-screen flex flex-col">
            <div className="presentation-wrapper flex-grow-1 h-100 relative flex items-center justify-center">
              <div className="presentation h-fit flex flex-col items-center relative">
                <h1>Yannick Liebnau</h1>
                <div className="subtitle-container mb-3 relative">
                  <h2 className="subtitle">Web Developer</h2>
                  <div className="opacity-0 line line1 w-16 h-px bg-gray-900 inline absolute top-1/2 left-0 translate-y-1/2"></div>
                  <div className="opacity-0 line line2 w-35 h-px bg-gray-900 inline absolute top-1/2 right-0 translate-y-1/2"></div>
                </div>
                <div className="description relative w-100 text-center">
                  <p>JavaScript / NodeJS / React</p>
                  <p>Prestashop / WordPress</p>
                </div>
              </div>
            </div>
            <div className="menu-wrapper self-end">
              <ul className="menu flex flex-col gap-5 text-right">
                <li className="menu-entry text-xl">Projects</li>
                <li className="menu-entry text-xl">About</li>
                <li className="menu-entry text-xl">Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
