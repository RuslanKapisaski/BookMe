export default function PropertyCard() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <img src={property.image} className="w-full rounded-xl shadow-lg" />

        <div>
          <h1 className="text-4xl font-bold">{property.name}</h1>
          <p className="text-gray-600">{property.city}</p>

          <div className="mt-4 text-2xl text-sky-700 font-bold">
            {property.pricePerNight} BGN / night
          </div>

          <p className="mt-5 text-gray-800">{property.description}</p>

          <button className="mt-6 bg-sky-700 text-white px-6 py-3 rounded-lg hover:bg-sky-800">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
