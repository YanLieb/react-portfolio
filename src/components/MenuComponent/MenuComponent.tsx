import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import scrollMenuAnim from './scrollMenuAnim';

import MenuListComponent from '../menuListComponent/MenuListComponent';

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
    <MenuListComponent ulClasses="menu flex flex-col gap-5 text-right" />
  </div >
}

export default MenuComponent;