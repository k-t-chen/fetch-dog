import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Fetch Dog Adoption
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/search" className="navbar-link">
          Search Dogs
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
