import { useRef, useState, useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { Canvas } from '@react-three/fiber'
import AnimatedBackground from './components/NoiseBackground/NoiseBackground'


import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import MenuComponent from './components/MenuComponent/MenuComponent';
import PresentationComponent from './components/PresentationComponent/PresentationComponent';

import "./App.css";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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
  }, { scope: container })

  return (
    <div ref={container} id="smooth-wrapper">
      <Canvas>
        <AnimatedBackground />
      </Canvas>

      <HeaderComponent />
      <div id="smooth-content">
        <div className="home container h-[200svh]">
          <div ref={wrapperRef} className="content-wrapper h-screen flex flex-col">
            <PresentationComponent />
            <div className="absolute bottom-[100svh] end-0">
              <MenuComponent wrapperWidth={wrapperWidth} wrapperHeight={wrapperHeight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
