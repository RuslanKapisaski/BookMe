import { Link, useNavigate, useParams } from "react-router";

import useApi from "../../hooks/useApi";
import { useUserContext } from "../../contexts/UserContext";
import Booking from "../../booking/Booking";
import Booking from "../booking/Booking";
import { useState } from "react";
import Review from "../review/Review";

export default function Details() {
  const [showBooking, setShowBooking] = useState(false);
  const { propertyId } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { data: property, request } = useApi(
    `/api/properties/${propertyId}/details`,
    {}
  );

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

  async function bookHandler() {
    setShowBooking(true);
  }


  return property ? (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <img src={property.image} className="w-full rounded-xl shadow-lg" />

        <div>
          <h1 className="text-4xl font-bold">{property.name}</h1>
          <p className="text-gray-600">{property.city}</p>
          <div className="mt-4 text-2xl text-sky-700 font-bold">
            {property.pricePerNight} BGN / night
          </div>
          <p className="mt-5 text-gray-800">{property.description}</p>
          <div className="flex items-start gap-8 mt-2">
            {user && (
              <>
                <button
                  className="mt-1 bg-sky-700 text-white px-12 py-1 rounded-lg hover:bg-sky-800"
                  onClick={bookHandler}
                >
                  Book Now
                </button>
                <Link
                  to={`/properties/${propertyId}/review`}
                  className="mt-1 bg-sky-700 text-white px-12 py-1 rounded-lg hover:bg-sky-800"
                  onClick={bookHandler}
                >
                  Add Review
                </Link>
              </>
            )}

            {showBooking && (
              <div className="mt-1">
                <Booking property={property} />
              </div>
            )}
          </div>
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
