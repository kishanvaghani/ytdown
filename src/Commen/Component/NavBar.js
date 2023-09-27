import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../Image/logo4.png";
import "../../Pages/NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logoDiv">
            <img src={Logo} alt="Logo" style={{ width: "50px" }}></img>
            <div>
              <span style={{ margin: "10px" }}>YT DOWN</span>
            </div>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={() => handleClick()}
              >
                Youtube Downloader
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={() => handleClick()}
              >
                Youtube Converter
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={() => handleClick()}
              >
                Youtube to Mp3
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={() => handleClick()}
              >
                Language
              </Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={() => handleClick()}>
            <GiHamburgerMenu />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
