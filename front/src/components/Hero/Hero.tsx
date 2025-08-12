import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import HeroAnim from './heroAnim.ts';
import MenuListComponent from '../Menu/Menu.tsx';
import Logo from '../../assets/svg/logo.svg?react';

function Hero() {
  const heroContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (heroContainer.current) {
      const presentationAnim = new HeroAnim(heroContainer.current)
      presentationAnim.init();
    }
  }, { scope: heroContainer })

  return (
    <div ref={heroContainer} className="hero__container container relative z-0 h-screen relative flex flex-col items-center justify-center">
      <div className="hero flex flex-col justify-center self-center items-center relative">
        <div className="hero__logo absolute start-1/2 -translate-x-1/2">
          <Logo className="w-30" />
        </div>
        <div className="hero__title-container bg-white relative z-10 flex flex-col justify-center items-center">
          <h1 className="hero__title">Yannick Liebnau</h1>
          <h2 className="hero__subtitle mb-3 h-15" data-text="Web Developer"></h2>
          <div className="hero__description relative w-100 text-center">
            <p className="invisible">JavaScript / NodeJS / React</p>
            <p className="invisible">Prestashop / WordPress</p>
          </div>
        </div>
      </div>
      <div className="hero__menu self-end absolute z-10 bottom-5">
        <MenuListComponent ulClasses="menu flex flex-col gap-2 text-right" />
      </div>
    </div>
  )
}

export default Hero;