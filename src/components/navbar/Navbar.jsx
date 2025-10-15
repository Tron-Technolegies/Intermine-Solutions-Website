import React, { useState } from "react";
import "../navbar/Navbar.css";
import interminelogo from "../../../public/logo/intermine-logo.webp";
import { IoSearchSharp } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { FaShoppingBag, FaBars } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
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
              <NavLink to="/shop" className="nav-link">
                Shop
              </NavLink>
            </li>

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

        <div className="nav-icons-desktop">
          <IoSearchSharp size={22} />
          <CiGlobe size={22} />
          <MdOutlineShoppingBag size={22} />
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
