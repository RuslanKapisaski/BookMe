import { Link } from "react-router";

export default function NotFound({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-800 text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-sky-400 mb-4">404</h1>

        <h2 className="text-2xl font-semibold mb-2">Page not found</h2>

        <p className="text-gray-300 mb-6">
          Oops! {message || "The page you are looking for does not exist!"}{" "}
          Let’s get you back to a cozy place!
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="bg-sky-700 hover:bg-sky-800 px-6 py-2 rounded-lg font-semibold transition"
          >
            Go Home
          </Link>

          <Link
            to="/catalog"
            className="border border-sky-500 text-sky-400 hover:bg-sky-900 px-6 py-2 rounded-lg font-semibold transition"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
