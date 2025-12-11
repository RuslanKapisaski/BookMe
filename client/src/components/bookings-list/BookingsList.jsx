import { useState } from "react";

export default function BookingsList({ bookings }) {
  const { isDeleted, setIsDeleted } = useState(true);

  if (!bookings || bookings.length === 0) {
    return <p className="text-gray-500">No bookings yet.</p>;
  }

  const deleteHandler = (bookingId) => {
    return 1;
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-sky-700">
              Booking by {booking.guest?.username || "Unknown"}
            </h3>

            <span className="text-gray-500 text-sm">
              {new Date(booking.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-gray-700">
            <div>
              <p className="font-medium">Property:</p>
              <p>{booking.property?.name || "Unknown"}</p>
            </div>

            <div>
              <p className="font-medium">Guests:</p>
              <p>{booking.guestsCount}</p>
            </div>

            <div>
              <p className="font-medium">Period:</p>
              <p>
                {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                {new Date(booking.dateTo).toLocaleDateString()} (
                {booking.period} days)
              </p>
            </div>

            <div>
              <p className="font-medium">Cost:</p>
              <p>${booking.bill}</p>
            </div>

            <div>
              <p className="font-medium">Contact email:</p>
              <p>{booking.guest.email}</p>
            </div>

            {booking.note && (
              <div className="col-span-2">
                <p className="font-medium">Note:</p>
                <p className="italic text-gray-600">{booking.note}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => deleteHandler(booking._id)}
            className={`px-4 py-2 rounded-lg font-semibold text-white ${
              isDeleted
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isDeleted ? "Deleted" : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
