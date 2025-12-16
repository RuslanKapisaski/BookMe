import { Link } from "react-router";
import Search from "../search/Search";

export default function Hero() {
  return (
    <section className="relative bg-sky-700 pt-10 pb-20 text-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <span className="inline-block bg-sky-800/40 px-4 py-1 rounded-full text-sm mb-4">
            Premium Stays • BookMe
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Book Unique Properties
            <br />
            In Beautiful Locations
            <br />
            With Just One Click.
          </h1>

          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            Discover amazing places to stay — from cozy cabins to modern
            apartments. Book easily, quickly and securely through BookMe.
          </p>

          <div className="flex items-center gap-4 mb-12">
            <div className="flex -space-x-3">
              <img
                className="w-10 h-10 rounded-full ring-2 ring-sky-900"
                src="https://randomuser.me/api/portraits/women/12.jpg"
              />
              <img
                className="w-10 h-10 rounded-full ring-2 ring-sky-900"
                src="https://randomuser.me/api/portraits/men/4.jpg"
              />
              <img
                className="w-10 h-10 rounded-full ring-2 ring-sky-900"
                src="https://randomuser.me/api/portraits/men/31.jpg"
              />
              <img
                className="w-10 h-10 rounded-full ring-2 ring-sky-900"
                src="https://randomuser.me/api/portraits/women/22.jpg"
              />
            </div>

            <div className="text-gray-300">
              <span className="font-bold text-white">6k+</span> happy travelers
            </div>
          </div>

          <Search />
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop"
            alt="Home"
            className="w-xl h-xl rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
