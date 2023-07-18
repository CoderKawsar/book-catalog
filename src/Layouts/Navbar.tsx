import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="flex justify-between px-20 py-4 w-full bg-gray-50 h-16 fixed top z-10">
      <div>
        <Link to="/">
          <img className="h-10" src={logo} alt="" />
        </Link>
      </div>
      <div>
        <NavLink className="px-4 pr-2 hover:text-orange-400" to="/">
          Home
        </NavLink>
        <NavLink className="px-4 py-2 hover:text-orange-400" to="/books">
          All Books
        </NavLink>
        <NavLink className="px-4 py-2 hover:text-orange-400" to="/login">
          Login
        </NavLink>
        <NavLink className="px-4 pl-2 hover:text-orange-400" to="/signup">
          Signup
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
