import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "./Navbar.css";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);

    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setIsLoggedIn(true);
      } else {
        // User is logged out
        setIsLoggedIn(false);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

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
        {!isLoggedIn ? (
          <>
            <NavLink className="px-4 py-2 hover:text-orange-400" to="/login">
              Login
            </NavLink>
            <NavLink className="px-4 pl-2 hover:text-orange-400" to="/signup">
              Signup
            </NavLink>
          </>
        ) : (
          <button
            className="px-4 py-2 hover:text-orange-400"
            onClick={() => void handleSignOut()}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
