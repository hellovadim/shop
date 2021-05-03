import React from "react";

function Header() {
  return (
    <nav className="teal orange darken-4">
      <div className="nav-wrapper">
        <span className="brand-logo">
          Shop
        </span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="sass.html">Repo</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export { Header };