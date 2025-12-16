import { useEffect, useState } from "react";

import BookingsList from "../bookings-list/BookingsList";
import useApi from "../../hooks/useApi";
import { useUserContext } from "../../contexts/UserContext";
import NotFound from "../not-found/NotFound";
import Properties from "../properties/Properties";

export default function Profile() {
  const { user } = useUserContext();
  const { request, loading, error } = useApi();
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);

  if (!user) {
    return (
      <NotFound
        message={
          "Seems like you do not have access to this page. Please login in order to see its content! "
        }
      />
    );
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const [bookings, propertiesResponce] = await Promise.all([
        request(`/api/bookings/me`, "GET", null, {
          accessToken: user.accessToken,
        }),
        request(`/api/properties/owner`),
      ]);
      const ownerProperties = propertiesResponce.properties;

      setBookings(bookings);
      setProperties(ownerProperties);
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex justify-center items-center max-w-full mx-auto p-10 space-y-6 bg-gradient-to-br from-slate-700 via-sky-900 to-black overflow-hidden text-white">
      <div className=" max-w-7xl  bg-white/4 backdrop-blur-2xl border border-white/20 shadow-6xl p-16">
        <div className="rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name?.[0] || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p>Profile: {user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h3 className="text-xl font-semibold mb-3">Your Properties</h3>
            <Properties properties={properties} />
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Your Bookings</h3>
            <BookingsList bookings={bookings} />
          </section>
        </div>
      </div>
    </section>
  );
}
