import { useRef, useState, useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

import MenuComponent from './components/MenuComponent/MenuComponent';

import { textApparitionAnim } from './animations';

import "./App.css";

gsap.registerPlugin(ScrollSmoother)
function App() {
 const container = useRef<HTMLDivElement>(null);
 const wrapperRef = useRef<HTMLDivElement>(null);
 const [wrapperWidth, setWrapperWidth] = useState<number>(0);
 const [wrapperHeight, setWrapperHeight] = useState<number>(0);

 useEffect(() => {
  const updateDimensions = () => {
   if (wrapperRef.current) {
    setWrapperWidth(wrapperRef.current.clientWidth);
    setWrapperHeight(wrapperRef.current.clientHeight);
   }
  };

  updateDimensions();

  window.addEventListener('resize', updateDimensions);

  return () => {
   window.removeEventListener('resize', updateDimensions);
  };
 }, []);

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
    <div className="home container h-[200svh]">
     <div ref={wrapperRef} className="content-wrapper h-screen flex flex-col">
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
      <MenuComponent wrapperWidth={wrapperWidth} wrapperHeight={wrapperHeight} />
     </div>
    </div>
   </div>
  </div >
 )
}

export default App
