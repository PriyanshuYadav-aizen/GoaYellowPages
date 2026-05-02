import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNormalUserAuth } from "../contexts/NormalUserAuthContext";
import { cn } from "../lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/", label: "Businesses" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 min-w-0">
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-lg">
      🌴
    </span>
    <span className="flex items-baseline gap-1 whitespace-nowrap">
      <span className="font-borel text-2xl leading-none text-primary-500">
        Goa
      </span>
      <span className="text-sm font-bold text-neutral-800 sm:text-base">
        Yellow Pages
      </span>
    </span>
  </Link>
);

const Navbar = () => {
  const { isLoggedIn, logout, user } = useNormalUserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors",
      isActive && location.pathname !== "/businesses"
        ? "text-primary-600 font-semibold"
        : "text-neutral-600 hover:text-primary-500"
    );

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-neutral-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={`${link.to}-${link.label}`} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                to="/user/login"
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-all hover:border-primary-400 hover:text-primary-600"
              >
                Sign In
              </Link>
              <Link
                to="/user/register"
                className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-button transition-all hover:bg-primary-600"
              >
                List Business
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/user/register"
                className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-button transition-all hover:bg-primary-600"
              >
                List Business
              </Link>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-sm font-bold text-secondary-700">
                {initials || "U"}
              </span>
              <button
                onClick={logout}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-all hover:border-primary-400 hover:text-primary-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 md:hidden"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-screen w-80 max-w-[86vw] bg-white p-5 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={`${link.to}-${link.label}-mobile`}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-4 py-3 text-sm font-medium",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-neutral-700 hover:bg-neutral-50"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/user/login" onClick={() => setIsOpen(false)} className="btn-secondary text-center">
                    Sign In
                  </Link>
                  <Link to="/user/register" onClick={() => setIsOpen(false)} className="btn-primary text-center">
                    List Business
                  </Link>
                </>
              ) : (
                <button onClick={logout} className="btn-secondary">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
