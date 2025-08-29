import React from "react";
import { Link } from "react-router";

function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar-logo">TestApp</div>
      <ul className="navbar-links">
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/github">Github</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
