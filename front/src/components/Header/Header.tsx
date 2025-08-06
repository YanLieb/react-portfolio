import Logo from '../../assets/svg/yan-logo.svg?react';
import MenuListComponent from '../Menu/Menu.tsx';

function Header() {
  return (
    <header className="header bg-white py-3 sticky top-0 m-auto z-50">
      <div className="container flex justify-between">
        <div className="logo-wrapper">
          <Logo className="logo w-10 h-auto" />
        </div>
        <div className="menu-wrapper">
          <MenuListComponent ulClasses="flex gap-4" liClasses="-translate-y-10" />
        </div>
      </div>
    </header>
  )
}

export default Header;