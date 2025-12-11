import { Link } from "react-router";

export default function Properties({ properties }) {
  return (
    //  backdrop-blur-md border
    <div className="flex gap-4  justify-center bg-white/10   rounded-xl shadow-lg p-4">
      {properties.length === 0 && (
        <p className="text-gray-300">No properties yet.</p>
      )}

      {properties.map((property) => (
        <div
          key={property._id}
          className="bg-sky-900 max-w-xs p-4 rounded-xl shadow-lg overflow-hidden"
        >
          <img
            src={property.image}
            alt={property.name}
            className="h-40 w-300 object-cover rounded-lg mb-3"
          />

          <h3 className="text-md font-semibold ">{property.name}</h3>
          <p className="text-gray-500">{property.city}</p>

          <p className="text-lg font-bold mt-2">
            ${property.pricePerNight} / night
          </p>

          <Link
            to={`/properties/${property._id}/details`}
            className="mt-3 inline-block bg-sky-700 hover:bg-sky-800 px-4 py-2 rounded-lg"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
