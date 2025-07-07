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

    const wrapper = container.current?.querySelector(".content-wrapper") as HTMLElement
    const wrapperWidth = wrapper?.offsetWidth;
    const wrapperHeight = wrapper?.offsetHeight;

    console.log(wrapperWidth, wrapperHeight);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".menu-entry:first-child",
        start: `top bottom-=150`,
        end: `bottom top-=150`,
        //markers: true,
        scrub: true,
        pin: true,
        pinSpacing: false,
      }
    })

    tl
      .to(".menu-entry:first-child", {
        x: `-${wrapperWidth && wrapperWidth / 2}px`,
      })
      .to(".menu-entry:first-child", {
        y: `-${wrapperHeight && wrapperHeight / 2}px`
      })

    ScrollTrigger.create({
      trigger: ".menu-entry:nth-child(2)",
      start: `top bottom-=100`,
      end: "bottom top-=100",
      pin: true,
      pinSpacing: false,
      //markers: true,
    })

    ScrollTrigger.create({
      trigger: ".menu-entry:nth-child(3)",
      start: `top bottom-=50`,
      end: "bottom top-=50",
      pin: true,
      pinSpacing: false,
      //markers: true,
    })

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
