import { Link } from "react-router";

export default function LatestProperties({ latest }) {

  return (
    <section className="max-w-6xl mx-auto mt-16 px-4 pb-16">
      <h2 className="text-3xl font-bold mb-6">Latest Properties</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {latest.length === 0 && (
          <p className="text-gray-300">No properties yet.</p>
        )}

        {latest.map((property) => (
          <div
            key={property._id}
            className="bg-sky-900 p-4 rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.name}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />

            <h3 className="text-xl font-semibold">{property.name}</h3>
            <p className="text-gray-300">{property.city}</p>

            <p className="text-lg font-bold mt-2">
              ${property.pricePerNight} / night
            </p>

            <Link
              to={`/properties/${property._id}`}
              className="mt-3 inline-block bg-sky-700 hover:bg-sky-800 px-4 py-2 rounded-lg"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
