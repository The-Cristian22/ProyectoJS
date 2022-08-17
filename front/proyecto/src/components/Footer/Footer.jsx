import React from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa"

function Footer() {
    return (
        <footer>
            <div className="copyright">
                <p>©2022 PARKONTROL</p>
            </div>
            <div className="social-follow">
            <a href="https://www.linkedin.com/in/sbcristiand/" aria-label="linkedin" rol="link" target="_blank" rel="noreferrer">
                <FaLinkedinIn className="social-icon" />
            </a>
            <a href="https://www.instagram.com/cristian_sanchez.b/" aria-label="instagram" rol="link" target="_blank" rel="noreferrer">
                <FaInstagram className="social-icon" />
            </a>
            </div>
        </footer>
    )
}
export default Footer;