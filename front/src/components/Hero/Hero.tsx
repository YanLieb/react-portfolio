import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import HeroAnim from './heroAnim.ts';
import MenuListComponent from '../Menu/Menu.tsx';

function Hero() {
  const heroContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (heroContainer.current) {
      const presentationAnim = new HeroAnim(heroContainer.current)
      presentationAnim.init();
    }
  }, { scope: heroContainer })

  return (
    <div ref={heroContainer} className="hero__container container z-0 h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div className="hero h-full flex flex-col justify-center self-center items-center relative">
        <h1 className="hero__title">Yannick Liebnau</h1>
        <div className="hero__subtitle__container mb-3 relative">
          <h2 className="hero__subtitle" data-text="Web Developer"> </h2>
          <div className="logo-line logo-line--1 h-px bg-gray-900 inline absolute top-1/2 translate-y-1/2 opacity-0 w-16 left-0"></div>
          <div className="logo-line logo-line--2 h-px bg-gray-900 inline absolute top-1/2 translate-y-1/2 opacity-0 w-35 right-0"></div>
        </div>
        <div className="hero__description relative w-100 text-center">
          <p>JavaScript / NodeJS / React</p>
          <p>Prestashop / WordPress</p>
        </div>
      </div>
      <div className="hero__menu self-end absolute bottom-5">
        <MenuListComponent ulClasses="menu flex flex-col gap-2 text-right" />
      </div>
    </div>
  )
}

export default Hero;