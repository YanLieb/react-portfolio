import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import scrollMenuAnim from './scrollMenuAnim';

interface MenuComponentProps {
 wrapperWidth: number;
 wrapperHeight: number;
}

function MenuComponent({ wrapperWidth, wrapperHeight }: MenuComponentProps) {
 const menuContainer = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
 const menuEntries = menuContainer.current?.querySelectorAll(".menu-entry") as NodeListOf<Element>

 useGSAP(() => {
  scrollMenuAnim(wrapperWidth, wrapperHeight, menuContainer, menuEntries)
 }, {
  scope: menuContainer,
  dependencies: [wrapperWidth, wrapperHeight]
 })

 return <div ref={menuContainer} className="menu-wrapper self-end">
  <ul className="menu flex flex-col gap-5 text-right">
   {["Projects", "About", "Contact"].map((entry, key) => (
    <li className={`menu-entry menu-entry-${key + 1} text-xl`} key={key}>{entry}</li>
   ))}
  </ul>
 </div>
}

export default MenuComponent;