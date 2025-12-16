export default function BookingsList({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return <p className="text-gray-500">No bookings yet.</p>;
  }

  return (
    <section className="space-y-2 ">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-glass bg-white/4 border border-white/10 rounded-xl p-4 text-white shadow-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-sky-300">
              Booking by {booking.guest?.username || "Unknown"}
            </h3>

            <span className="text-sm">
              {new Date(booking.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <img
                className="w-md h-md  ring-2 ring-sky-900"
                src={booking.property.image}
                alt="Property image"
              />
            </div>
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
              <p className="text-[10px]">
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
                <p className="italic">{booking.note}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
