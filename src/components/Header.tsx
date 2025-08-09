import { NavLink } from "react-router";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/financial", label: "Financial" },
];

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
