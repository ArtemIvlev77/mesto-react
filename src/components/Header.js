import React from "react";
import logo from "../image/logo.svg";

function Header() {
  return (
    <header className="header page__section">
      <img src={logo} alt="логотип: место россия" className="header__logo" />
    </header>
  );
}

export default Header;
