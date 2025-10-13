import React, { useState } from "react";
import "../navbar/Navbar.css";
import interminelogo from "../../../public/logo/intermine-logo.webp";
import { IoSearchSharp } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

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
            <img src={interminelogo} alt="intermine-solutions" />
          </div>
          <div className="nav-hamburger" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
        </div>

        <div className="nav-menus sora">
          <ul>
            <li>Store</li>
            <Link to="/hosting-services">Hosting</Link>
            <li>Facilities</li>
            <li>Blogs</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="nav-icons-desktop">
          <IoSearchSharp size={30} />
          <CiGlobe size={30} />
          <FaShoppingBag size={30} />
        </div>

        {isOpen && (
          <div className="mobile-menu">
            <div className="mobile-menus sora">
              <ul>
                <li onClick={toggleMenu}>Store</li>
                <li onClick={toggleMenu}>Hosting</li>
                <li onClick={toggleMenu}>Facilities</li>
                <li onClick={toggleMenu}>Blogs</li>
                <li onClick={toggleMenu}>FAQ</li>
              </ul>
            </div>
            <div className="mobile-icons">
              <IoSearchSharp size={15} onClick={toggleMenu} />
              <CiGlobe size={15} onClick={toggleMenu} />
              <FaShoppingBag size={15} onClick={toggleMenu} />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;