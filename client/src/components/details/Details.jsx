import { useNavigate, useParams } from "react-router";
import useApi from "../../hooks/useApi";
import { useUserContext } from "../../contexts/UserContext";

export default function Details() {
  const { propertyId } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { data: property, request } = useApi(
    `/api/properties/${propertyId}/details`,
    {}
  );

  function refreshHandler() {
    setRefresh((state) => !state);
  }

  async function deleteHandler() {
    const isConfirmed = confirm(
      `Are you sure you want to delete ${property.name}`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await request(`/api/properties/${propertyId}`, "DELETE");

      navigate("/catalog");
    } catch (err) {
      alert(`Unable to delete ${property.name}: ${err.message}`);
    }
  }

  console.log(user?.email);
  console.log(property?.owner?.email);

  return property ? (
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
          {user && (
            <button className="mt-6 bg-sky-700 text-white px-6 py-3 rounded-lg hover:bg-sky-800">
              Book Now
            </button>
          )}

          {user?.email === property?.owner?.email ? (
            <button
              className="mt-6 m-1 bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-900"
              onClick={deleteHandler}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  ) : (
    <p>Loading..</p>
  );
}
