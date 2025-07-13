import Logo from '../../assets/yan-logo.svg?react';

function HeaderComponent() {
  return (
    <header className="header container py-2 fixed top-0 left-0 right-0 m-auto z-50">
      <div className="logo-wrapper">
        <Logo className="logo w-10 h-auto" />
      </div>
    </header>
  )
}

export default HeaderComponent;