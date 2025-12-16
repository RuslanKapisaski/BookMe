import { useNavigate } from "react-router";

export default function PopularDestinations() {
  const navigate = useNavigate();

  const handleClick = (cityName) => {
    navigate(`/catalog?city=${cityName}`);
  };

  return (
    <section className="max-w-6xl mx-auto p-10 pt-20">
      <h2 className="text-3xl font-bold mb-6">Popular Destinations</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            name: "Bansko",
            image: "https://mybgday.com/images/blog/2023/3.jpg",
          },
          {
            name: "Sofia",
            image: "https://endurotourssofia.com/wp-content/uploads/sofia.webp",
          },
          {
            name: "Varna",
            image:
              "https://www.barcelo.com/guia-turismo/wp-content/uploads/2025/01/varna-4.jpg",
          },
          {
            name: "Plovdiv",
            image:
              "https://www.barcelo.com/guia-turismo/wp-content/uploads/2025/03/plovdiv.jpg",
          },
        ].map((city) => (
          <div
            key={city.name}
            onClick={() => handleClick(city.name)}
            className="relative h-32 md:h-60 rounded-xl overflow-hidden shadow-lg "
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
  );
}
