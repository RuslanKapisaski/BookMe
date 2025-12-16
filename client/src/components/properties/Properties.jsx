import { Link } from "react-router";

export default function Properties({ properties = [] }) {
  return (
    <section className="flex gap-2 justify-center bg-white/4 text-white/90 shadow-xl rounded-xs shadow-lg p-4">
      {properties.length === 0 && (
        <p className="text-gray-300">No properties yet.</p>
      )}

      {properties.map((property) => (
        <div
          key={property._id}
          className="bg-glass border border-white/10 shadow-xl max-w-xs p-4 rounded-xl shadow-lg overflow-hidden"
        >
          <img
            src={property.image}
            alt={property.name}
            className="h-40 w-300 object-cover rounded-lg mb-3"
          />

          <h3 className="text-md font-semibold ">{property.name}</h3>
          <p className="text-gray-400">{property.city}</p>

          <p className="text-md mt-2">
            Price:{" "}
            <span className="text-lg font-bold">{property.pricePerNight} </span>
            / night
          </p>

          <Link
            to={`/properties/${property._id}/details`}
            className="mt-3 inline-block bg-sky-700 hover:bg-sky-800 px-4 py-2 rounded-lg"
          >
            View Details
          </Link>
        </div>
      ))}
    </section>
  );
}
