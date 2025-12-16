import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";

import useForm from "../../hooks/useForm";
import useApi from "../../hooks/useApi";
import Toast from "../toast/Toast";

export default function Booking({ property }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [period, setPeriod] = useState(0);
  const [bill, setBill] = useState(0);
  const [guests, setGuests] = useState(1);
  const { request } = useApi();
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setGuests(value);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const msDiff = endDate - startDate;
      const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      setPeriod(days > 0 ? days : 0);
      setBill(days > 0 ? days * property.pricePerNight : 0);
    } else {
      setPeriod(0);
      setBill(0);
    }
  }, [startDate, endDate, property.pricePerNight]);

  const bookingHandler = async (formData) => {
    if (guests < 1 || guests > property.capacity) {
      alert(`Guests must be between 1 and ${property.capacity}`);
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select start and end dates");
      return;
    }

    const booking = {
      property: property._id,
      dateFrom: startDate,
      dateTo: endDate,
      period,
      bill,
      guestsCount: guests,
      note: formData.note || "",
    };

    try {
      const result = await request("/api/bookings", "POST", booking);
      setToast({ message: "Booking successful!", type: "success" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Booking failed:", err);
      setToast({ message: err.message || "Booking failed", type: "error" });
    }
  };

  const { register, formAction, error } = useForm(bookingHandler, {
    note: "",
  });

  return (
    <section className="flex flex-row gap-4 w-lg">
      <DatePicker
        selected={startDate}
        onChange={(dates) => {
          if (Array.isArray(dates)) {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          } else {
            setStartDate(dates);
            setEndDate(null);
          }
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />

      <div className=" glass backdrop-blur-md hover:bg-white/20 transition-colors  bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg">
        {startDate && <p>Start Date: {startDate.toLocaleDateString()}</p>}
        {endDate && <p>End Date: {endDate.toLocaleDateString()}</p>}
        {period > 0 && (
          <>
            <p>Period: {period} days</p>
            <p>
              Cost: <strong>{bill}</strong> $
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                formAction();
              }}
            >
              <div className="mt-3">
                <label htmlFor="guests">Number of Guests:</label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  max={property.capacity}
                  value={guests}
                  onChange={handleGuestsChange}
                  className="mt-1 w-full px-1 py-1 border rounded-lg"
                />
              </div>

              <div className="mt-3">
                <label htmlFor="note">Notes:</label>
                <textarea
                  id="note"
                  placeholder="Leave a note"
                  {...register("note")}
                  className="mt-1 w-full px-2 py-1 border rounded-lg"
                />
              </div>

              <input
                type="submit"
                value="Confirm Booking"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg mt-3"
              />
            </form>
          </>
        )}
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
