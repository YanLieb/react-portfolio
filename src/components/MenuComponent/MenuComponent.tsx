import { useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import scrollMenuAnim from './ScrollMenuAnim';

gsap.registerPlugin(ScrollTrigger)

interface MenuComponentProps {
 wrapperWidth: number;
 wrapperHeight: number;
}

function MenuComponent({ wrapperWidth, wrapperHeight }: MenuComponentProps) {
 const container = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
 const menuEntries = container.current?.querySelectorAll(".menu-entry") as NodeListOf<Element>

 useGSAP(() => {
  scrollMenuAnim(wrapperWidth, wrapperHeight, container, menuEntries)
 }, {
  scope: container,
  dependencies: [wrapperWidth, wrapperHeight]
 })

 return <div ref={container} className="menu-wrapper self-end">
  <ul className="menu flex flex-col gap-5 text-right">
   {["Projects", "About", "Contact"].map((entry, key) => (
    <li className={`menu-entry menu-entry-${key + 1} text-xl`} key={key}>{entry}</li>
   ))}
  </ul>
 </div>
}

export default MenuComponent;