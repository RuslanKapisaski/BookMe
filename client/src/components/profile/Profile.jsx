import React, { useEffect, useState } from "react";
import BookingsList from "../bookings-list/BookingsList";
import useApi from "../../hooks/useApi";
import { useUserContext } from "../../contexts/UserContext";
import NotFound from "../not-found/NotFound";
export default function Profile() {
  const { user } = useUserContext();

  if (!user) {
    return (
      <NotFound
        message={
          "Seems like you do not have access to this page. Please login in order to see its content! "
        }
      />
    );
  }

  const { request } = useApi();
  const [bookings, setBookings] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const bookings = await request(`/api/bookings/me`, "GET", null, {
          accessToken: user.accessToken,
        });

        setBookings(bookings);
      } catch (error) {}
      setError("Failed to fetch bookings");
      console.error("Failed to fetch bookings:", error);
    };
    fetchUserBookings();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            {user.name?.[0] || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">Member since: {user.createdAt}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Your Bookings
        </h3>
        <BookingsList bookings={bookings} />
      </div>
    </div>
  );
}
