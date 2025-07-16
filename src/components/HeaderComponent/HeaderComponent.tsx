import Logo from '../../assets/yan-logo.svg?react';
import MenuListComponent from '../menuComponent/MenuComponent';

function HeaderComponent() {
  return (
    <header className="header container py-2 fixed top-0 left-0 right-0 m-auto z-50 flex justify-between">
      <div className="logo-wrapper">
        <Logo className="logo w-10 h-auto" />
      </div>
      <div className="menu-wrapper">
        <MenuListComponent ulClasses="flex gap-4" liClasses="-translate-y-10" />
      </div>
    </header>
  )
}

export default HeaderComponent;