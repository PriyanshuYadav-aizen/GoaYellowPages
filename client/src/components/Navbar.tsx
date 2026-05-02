import { Link } from "react-router-dom";
import { useNormalUserAuth } from "../contexts/NormalUserAuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useNormalUserAuth();
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Goa Yellow Pages
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/businesses"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Businesses
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex space-x-2">
            {!isLoggedIn ? (
              <>
                <Link to="/user/login" className="btn-secondary">User Login</Link>
                <Link to="/user/register" className="btn-primary">User Register</Link>
              </>
            ) : (
              <button onClick={logout} className="btn-secondary">Logout</button>
            )}
            <Link to="/login" className="btn-secondary">Admin Login</Link>
            <Link to="/register" className="btn-primary">Admin Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
