import { useEffect, useState } from "react";
import "./Nav.css";
import ThemeToggle from "../ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PAGE, PROFILE_PAGE } from "../../constants";

function Nav() {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const url = window.location.pathname;
  const route = url.substring(url.lastIndexOf("/") + 1);

  const reload = () => {
    window.location.reload();
  };

  const handleClick = () => {
    if (route !== PROFILE_PAGE) {
      navigate(PROFILE_PAGE);
    } else {
      reload();
    }
  };

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__left">
        <Link to={HOME_PAGE}>
          <img
            className="nav__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
            alt="Netflix logo"
          />
        </Link>
      </div>
      <div className="nav__right">
        <img
          onClick={handleClick}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Netflix avatar"
        />
        <div className="nav_toggle">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default Nav;
