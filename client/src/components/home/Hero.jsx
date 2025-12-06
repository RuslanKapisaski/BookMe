import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="h-[60vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-sky-900 to-sky-700">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Book Your Next Stay
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-6">
        Discover beautiful homes and places to stay for your next adventure.
      </p>
      <Link
        to="/catalog"
        className="px-6 py-3 bg-white text-sky-900 font-semibold rounded-lg shadow hover:bg-gray-200"
      >
        Browse Properties
      </Link>
    </section>
  );
}
