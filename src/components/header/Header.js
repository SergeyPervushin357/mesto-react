import React from "react";
import logo from '../../images/logo.svg';

function Header() {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="логотип" />
    </div>
  )
}

export default Header;