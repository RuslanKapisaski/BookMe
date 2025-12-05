import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-sky-950 text-gray-300 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-3">BookMe</h3>
            <p className="text-sm text-gray-400">
              Find the perfect place for your next trip.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sky-800 mt-8 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} BookMe — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
