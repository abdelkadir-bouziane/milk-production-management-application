import { NavLink } from "react-router-dom";

const CustomNavLink = ({ route, text, setMenuVisibility }) => {
  return (
    <li>
      <NavLink
        to={route}
        className={({ isActive }) =>
          isActive ? "nav-link-active nav-link" : "nav-link"
        }
        onClick={() => {
          setMenuVisibility(false);
        }}
      >
        {text}
      </NavLink>
    </li>
  );
};

export default CustomNavLink;
