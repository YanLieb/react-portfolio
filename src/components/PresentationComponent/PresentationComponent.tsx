import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import PresentationAnimation from './presentationAnim';
import MenuListComponent from '../menuComponent/MenuComponent';

function PresentationComponent() {
  const presentationContainer = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLHeadingElement>(null);
  const description = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (presentationContainer.current) {
      const presentationAnim = new PresentationAnimation(presentationContainer.current)
      presentationAnim.init();
    }
  }, { scope: presentationContainer })

  return (
    <div ref={presentationContainer} className="presentation-wrapper">
      <div className="presentation h-fit flex flex-col items-center relative">
        <h1 ref={title} className="!text-h1">Yannick Liebnau</h1>
        <div className="subtitle-container mb-3 relative">
          <h2 ref={subtitle} className="subtitle !text-h2">Web Developer</h2>
          <div className="logo-line logo-line--1"></div>
          <div className="logo-line logo-line--2"></div>
        </div>
        <div ref={description} className="description relative w-100 text-center">
          <p>JavaScript / NodeJS / React</p>
          <p>Prestashop / WordPress</p>
        </div>
      </div>
      <div className="presentation-menu self-end absolute bottom-0">
        <MenuListComponent ulClasses="menu flex flex-col gap-2 text-right" />
      </div>
    </div>
  )
}

export default PresentationComponent;