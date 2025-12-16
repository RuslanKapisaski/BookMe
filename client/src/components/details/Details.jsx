import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

import useApi from "../../hooks/useApi";
import { useUserContext } from "../../contexts/UserContext";
import Booking from "../booking/Booking";
import Toast from "../toast/Toast";
import ReviewList from "../review-list/ReviewList";

export default function Details() {
  const [showBooking, setShowBooking] = useState(false);
  const { propertyId } = useParams();
  const { user } = useUserContext();
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const { data: property, request: propertyRequest } = useApi(
    `/api/properties/${propertyId}/details`,
    {}
  );

  const { data: reviewsResponse, error: reviewsError } = useApi(
    `/api/reviews/${propertyId}/details`
  );

  const reviews = reviewsResponse?.review || [];

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  useEffect(() => {
    if (reviewsError && reviewsError !== "Review not found") {
      showToast(reviewsError, "error");
    }
  }, [reviewsError]);

  async function deleteHandler() {
    const isConfirmed = confirm(
      `Are you sure you want to delete ${property.name}?`
    );
    if (!isConfirmed) return;

    try {
      await propertyRequest(`/api/properties/${propertyId}`, "DELETE");
      showToast(`${property.name} deleted successfully`, "success");
      navigate("/catalog");
    } catch (err) {
      showToast(`Unable to delete ${property.name}: ${err.message}`, "error");
    }
  }

  function bookHandler() {
    setShowBooking((prev) => !prev);
  }

  function closeBookHandler() {
    setShowBooking(false);
  }

  if (!property) return <p>Loading...</p>;

  return (
    <section className="flex justify-center max-w-full px-auto py-10 bg-green bg-gradient-to-br from-slate-700 via-sky-900 to-black overflow-hidden">
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white/90">
          <div className="lg:col-span-2 flex flex-col gap-4 p-6 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg transition-all transform hover:scale-101 hover:shadow-xl">
            <img
              src={property.image}
              alt={property.name}
              className="w-full max-h-100 rounded-xl shadow-lg"
            />

            <div>
              <h1 className="text-4xl font-bold">{property.name}</h1>
              <p className="text-s mt-2">{property.address}</p>
              <div className="mt-4 text-2xl text-gray-300 font-bold">
                {property.pricePerNight} BGN / night
              </div>
              <p className="mt-5">{property.description}</p>
            </div>

            {user && (
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={bookHandler}
                  className="bg-sky-700 px-6 py-3 rounded-lg hover:bg-sky-900 transition"
                >
                  Book Now
                </button>

                {user?.email === property?.owner?.email ? (
                  <>
                    <Link
                      to={`/properties/${propertyId}/edit`}
                      className="bg-green-700/50 px-6 py-3 rounded-lg hover:bg-green-900 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={deleteHandler}
                      className="bg-red-700/50 px-6 py-3 rounded-lg hover:bg-red-900 transition"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <Link
                    to={`/properties/${propertyId}/review`}
                    state={{ image: property.image }}
                    className="bg-sky-500/50 px-12 py-2 rounded-lg hover:bg-sky-800 transition"
                  >
                    Add Review
                  </Link>
                )}
              </div>
            )}

            {showBooking && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="glass rounded-xl shadow-2xl p-10 relative w-full max-w-xl h-110 backdrop-blur-md bg-white/10 border border-white/2">
                  <h3 className="mb-2 text-white">Choose your date</h3>

                  <button
                    onClick={closeBookHandler}
                    className="absolute top-1 right-4 text-red-600 hover:text-red-800 text-3xl font-bold"
                  >
                    &times;
                  </button>

                  <Booking property={property} />
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1 bg-white/30 backdrop-blur-md rounded-xl p-4 shadow-lg flex flex-col">
            <h1 className="text-2xl mb-20">Reviews:</h1>
            <ReviewList reviews={reviews} />
          </aside>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
