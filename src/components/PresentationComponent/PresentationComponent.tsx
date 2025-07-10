import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import PresentationAnimation from './presentationAnim';

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
  <div ref={presentationContainer} className="presentation-wrapper flex-grow-1 h-100 relative flex items-center justify-center">
   <div className="presentation h-fit flex flex-col items-center relative">
    <div className="logo-container text-center">
     <h1 ref={title} className="!text-h1">Yannick Liebnau</h1>
     <div className="subtitle-container mb-3 relative">
      <h2 ref={subtitle} className="subtitle !text-h2">Web Developer</h2>
      <div className="opacity-0 line line1 w-16 h-px bg-gray-900 inline absolute top-1/2 left-0 translate-y-1/2"></div>
      <div className="opacity-0 line line2 w-35 h-px bg-gray-900 inline absolute top-1/2 right-0 translate-y-1/2"></div>
     </div>
    </div>
    <div ref={description} className="description relative w-100 text-center">
     <p>JavaScript / NodeJS / React</p>
     <p>Prestashop / WordPress</p>
    </div>
   </div>
  </div>
 )
}

export default PresentationComponent;