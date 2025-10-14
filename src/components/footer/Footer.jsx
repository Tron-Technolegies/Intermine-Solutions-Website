import React from "react";
import "../footer/Footer.css";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="sora">
        <div className="footer-address-section">
          <h3>
            DCT Data Center Technologies GmbH <br />
            ASIC Miner Store. Crypto Miner Hosting. Crypto Service.
          </h3>
          <h3>
            Geiststr. 3 <br /> 59320 Ennigerloh • Germany
          </h3>
          <div className="contact-item">
            <IoMail className="icon" /> <span>info@interminesolutions.de</span>
          </div>
          <div className="contact-item">
            <FaPhone className="icon" /> <span>+49 2524 616133</span>
          </div>
        </div>

        <div className="footer-support-section">
          <h3>LEGAL</h3>
          <ul>
            <li>Terms and Conditions</li>
            <li>Imprint</li>
            <li>Data Protection</li>
            <li>Revocation</li>
            <li>Payment and Shipping</li>
            <li>Support Ticket</li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3>SIGN UP FOR THE NEWSLETTER</h3>
          <label>Stay up to date and subscribe to us.</label>
          <input type="text" placeholder="First name" />
          <input type="email" placeholder="Your email" />
          <label className="checkbox-label">
            <input type="checkbox" /> Receive news and offers via email
          </label>
          <button>
            <IoMail />
            SUBSCRIBE
          </button>
        </div>
      </footer>

      <div className="footer-bottom sora">
        <p>
          © {new Date().getFullYear()} Intermine Solutions. All rights reserved.
        </p>
        <p>
          Powered by <span><a href="https://trondigital.ae" >Tron Digital</a></span>
        </p>
      </div>
    </>
  );
};

export default Footer;
