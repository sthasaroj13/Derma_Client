import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import useAppSelector from "../Hooks/useAppSelector";
import { User, Menu, X } from "lucide-react";
import useDropdown from "../hook/useDropdown";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, name, is_admin } = useAppSelector(
    (state) => state.auth
  );
  const { isOpen, toggle, closeDropdown, dropdownRef } = useDropdown();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (isOpen) closeDropdown();
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex text-[17px] font-semibold items-center justify-between px-6 py-2 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-orange-600">
        <Link to="/">Derma AI</Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation Links */}

      {is_admin ? (
        <>
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "hover:text-orange-600 transition text-orange-600"
                  : "text-gray-700 hover:text-orange-600 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                isActive
                  ? "hover:text-orange-600 transition text-orange-600"
                  : "text-gray-700 hover:text-orange-600 transition"
              }
            >
              About Us
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "hover:text-orange-600 transition text-orange-600"
                  : "text-gray-700 hover:text-orange-600 transition"
              }
            >
              Home
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "hover:text-orange-600 transition text-orange-600"
                    : "text-gray-700 hover:text-orange-600 transition"
                }
              >
                Dashboard
              </NavLink>
            )}

            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                isActive
                  ? "hover:text-orange-600 transition text-orange-600"
                  : "text-gray-700 hover:text-orange-600 transition"
              }
            >
              About Us
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/contract"
                className={({ isActive }) =>
                  isActive
                    ? "hover:text-orange-600 transition text-orange-600"
                    : "text-gray-700 hover:text-orange-600 transition"
                }
              >
                Contract
              </NavLink>
            )}
          </div>
        </>
      )}

      {/* Desktop Profile/Login Buttons */}
      <div className="hidden md:flex items-center gap-3">
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={toggle}
              className="px-4 py-1 flex gap-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition cursor-pointer"
            >
              <User />
              <span className="capitalize">{name ? `${name}` : "Profile"}</span>
            </div>
            {isOpen && (
              <div className="absolute bg-white left-0 shadow-2xl w-full top-[2.1rem] border border-slate-200 rounded-[4px] px-2.5 py-1 ">
                <ul>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "hover:text-orange-600 transition text-orange-600"
                        : "text-gray-700 hover:text-orange-600 transition"
                    }
                    onClick={closeDropdown}
                  >
                    <li>Profile</li>
                  </NavLink>
                  <li
                    className="cursor-pointer hover:text-orange-600 transition"
                    onClick={logoutHandler}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-1 rounded-md text-orange-600 border border-orange-500 hover:bg-orange-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute rounded-[.25rem] top-[3.04rem] right-0 w-[10rem] bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col gap-2 px-6 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 hover:text-orange-600 transition"
                  : "text-gray-700 hover:text-orange-600 transition"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 hover:text-orange-600 transition"
                    : "text-gray-700 hover:text-orange-600 transition"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink
                to="/addclinic"
                className={({ isActive }) =>
                  isActive
                    ? "hover:text-orange-600 transition text-orange-600"
                    : "text-gray-700 hover:text-orange-600 transition"
                }
              >
                Add Clinic
              </NavLink>
            )}
            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 hover:text-orange-600 transition"
                  : "text-gray-700 hover:text-orange-600 transition"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/contract"
                className={({ isActive }) =>
                  isActive
                    ? "hover:text-orange-600 transition text-orange-600"
                    : "text-gray-700 hover:text-orange-600 transition"
                }
              >
                Contract
              </NavLink>
            )}

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 hover:text-orange-600 transition"
                      : "text-gray-700 hover:text-orange-600 transition"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <li
                  className="cursor-pointer hover:text-orange-600 transition"
                  onClick={logoutHandler}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 hover:text-orange-600 transition"
                      : "text-gray-700 hover:text-orange-600 transition"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 hover:text-orange-600 transition"
                      : "text-gray-700 hover:text-orange-600 transition"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
