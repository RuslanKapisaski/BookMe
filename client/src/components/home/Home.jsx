import { Link } from "react-router";
import { useEffect, useState } from "react";
import Hero from "./Hero";

export default function HomePage() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/properties/latest")
      .then((res) => res.json())
      .then((data) => setLatest(data.properties || []))
      .catch(() => {});
  }, []);

  return (
    <div className="bg-sky-950 min-h-screen text-white">
      {/* HERO */}
      <Hero />

      {/* POPULAR DESTINATIONS */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-bold mb-6">Popular Destinations</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Bansko", image: "https://i.imgur.com/vU6wqYa.jpg" },
            { name: "Sofia", image: "https://i.imgur.com/gkAJFgo.jpg" },
            { name: "Varna", image: "https://i.imgur.com/z9Hq5SW.jpg" },
            { name: "Plovdiv", image: "https://i.imgur.com/KsiTvzM.jpg" },
          ].map((city) => (
            <div
              key={city.name}
              className="relative h-32 md:h-40 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={city.image}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-lg font-bold">{city.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST PROPERTIES */}
      <section className="max-w-6xl mx-auto mt-16 px-4 pb-16">
        <h2 className="text-3xl font-bold mb-6">Latest Properties</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {latest.length === 0 && (
            <p className="text-gray-300">No properties yet.</p>
          )}

          {latest.map((p) => (
            <div
              key={p._id}
              className="bg-sky-900 p-4 rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />

              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-gray-300">{p.city}</p>

              <p className="text-lg font-bold mt-2">
                ${p.pricePerNight} / night
              </p>

              <Link
                to={`/properties/${p._id}`}
                className="mt-3 inline-block bg-sky-700 hover:bg-sky-800 px-4 py-2 rounded-lg"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
