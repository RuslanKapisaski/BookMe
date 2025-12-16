import { Link } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {
  const { isAuthenticated, user } = useUserContext();

  return (
    <>
      <header className="bg-sky-900 text-white shadow-md font-medium p-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 text-2xl font-bold">BookMe</div>
            <nav className="hidden md:flex space-x-4">
              <div>
                <Link to="/" className="hover:text-gray-200 p-2">
                  Home
                </Link>
                <Link to="/catalog" className="hover:text-gray-200 p-2">
                  Catalog
                </Link>
                <Link to="/about" className="hover:text-gray-200">
                  About
                </Link>
              </div>
              {isAuthenticated ? (
                <div>
                  <Link to="/properties/add" className="hover:text-gray-200">
                    Add property
                  </Link>

                  <Link to="/profile" className="hover:text-gray-200 p-2">
                    Profile
                  </Link>

                  <Link to="/logout" className="hover:text-gray-200 p-2">
                    Logout
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/register" className="hover:text-gray-200">
                    Register
                  </Link>

                  <Link to="/login" className="hover:text-gray-200 p-2">
                    Login
                  </Link>
                </div>
              )}
              {user && (
                <p className="text-sky-800 hover:text-sky-500">{user.email}</p>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
