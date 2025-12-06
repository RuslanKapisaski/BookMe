import { Link } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {
  const { isAuthenticated, user } = useUserContext();

  return (
    <>
      <header className="bg-sky-950 text-white shadow-md font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 text-2xl font-bold">BookMe</div>

            <nav className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
              {isAuthenticated ? (
                <div>
                  <Link
                    to="/properties/add"
                    className="hover:text-gray-200 p-2"
                  >
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
                  <Link to="/about" className="hover:text-gray-200 p-2">
                    About
                  </Link>

                  <Link to="/register" className="hover:text-gray-200 p-2">
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
