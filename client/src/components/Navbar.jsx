import { useState } from "react";
import { Link } from "react-router-dom";
import { CgClose, CgMenu } from "react-icons/cg";
import logo from "../images/logo.svg";
import CustomNavLink from "./CustomNavLink";

const Navbar = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);

  const navElements = [
    { route: "/", text: "حظيرة البقر" },
    { route: "/tests", text: "الفحوصات الطبية" },
    { route: "/births", text: "الولادات" },
    { route: "/productions", text: "إنتاج الحليب" },
  ];

  return (
    <header>
      <div className="content">
        <Link
          to="/"
          onClick={() => {
            setMenuVisibility(false);
          }}
        >
          <img src={logo} alt="logo" className="logo" />
        </Link>

        <div className="menu-button">
          {menuVisibility ? (
            <CgClose
              onClick={() => {
                setMenuVisibility(!menuVisibility);
              }}
            />
          ) : (
            <CgMenu
              onClick={() => {
                setMenuVisibility(!menuVisibility);
              }}
            />
          )}
        </div>

        <nav className={menuVisibility ? "show-menu" : "hide-menu"}>
          <ul>
            {navElements.map((element, index) => (
              <CustomNavLink
                key={index}
                route={element.route}
                text={element.text}
                setMenuVisibility={setMenuVisibility}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
