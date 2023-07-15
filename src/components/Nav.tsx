import React, { useEffect, useState } from "react";
import "./Nav.css";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

function Nav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => { });
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <a href="/">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
          alt="Netflix logo"
        />
      </a>
      <img
        className="nav__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix avatar"
      />
      <div className="nav_toggle">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Nav;
