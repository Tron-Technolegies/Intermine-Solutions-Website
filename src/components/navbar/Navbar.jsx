import React, { useState } from "react";
import "../navbar/Navbar.css";
import interminelogo from "../../../public/logo/intermine-logo.webp";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav>
        <div className="nav-left">
          <div className="nav-logo">
            <Link to="/">
              <img src={interminelogo} alt="intermine-solutions" />
            </Link>
          </div>
          <div className="nav-hamburger" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
        </div>

        <div className="nav-menus sora">
          <ul>
            <li>
              <NavLink to="/hosting-services" className="nav-link">
                Hosting
              </NavLink>
            </li>
            <li>
              <NavLink to="/facilities" className="nav-link">
                Facilities
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className="nav-link">
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className="nav-link">
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Desktop Shop Now Button */}
        <div className="nav-btn-container sora">
          <Link to="/shop" className="shop-now-btn">
            Shop Now
          </Link>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu open">
            <div className="mobile-menus sora">
              <ul>
                <li onClick={toggleMenu}>
                  <NavLink to="/hosting-services" className="nav-link">
                    Hosting
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink to="/facilities" className="nav-link">
                    Facilities
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink to="/blogs" className="nav-link">
                    Blogs
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink to="/faq" className="nav-link">
                    FAQ
                  </NavLink>
                </li>
              </ul>

              {/* Shop Now Button for Mobile */}
              <div className="mobile-shop-btn-container">
                <Link to="/shop" className="shop-now-btn" onClick={toggleMenu}>
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
