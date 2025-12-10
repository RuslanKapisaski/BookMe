import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import useForm from "../hooks/useForm";
import useApi from "../hooks/useApi";
import { useUserContext } from "../contexts/UserContext";

export default function Booking({ property }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [period, setPeriod] = useState(0);
  const [bill, setBill] = useState(0);
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState({});

  const { request } = useApi();
  const { user } = useUserContext();
  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setGuests(value);

    if (value < 1) {
      setErrors((prev) => ({ ...prev, guestsCount: "Minimum 1 guest" }));
    } else if (value > property.capacity) {
      setErrors((prev) => ({
        ...prev,
        guestsCount: `Maximum capacity is ${property.capacity}`,
      }));
    } else {
      setErrors((prev) => {
        const { guestsCount, ...rest } = prev;
        return rest;
      });
    }
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
      guest: user._id,
      property: property._id,
      dateFrom: startDate,
      dateTo: endDate,
      period,
      bill,
      guestsCount: guests,
      note: formData.note || "",
    };
    console.log(booking);

    try {
      const result = await request("/api/bookings", "POST", booking);
      console.log("Booking successful:", result);
      alert("Booking successful!");
    } catch (err) {
      console.error("Booking failed:", err);
      alert(err.message || "Booking failed");
    }
  };

  const { register, formAction, error } = useForm(bookingHandler, {
    note: "",
  });

  return (
    <div className="flex flex-col gap-2">
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

      <div className="p-1 border border-gray-500 rounded-sm">
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
                {errors.guestsCount && (
                  <p className="text-red-600">{errors.guestsCount}</p>
                )}
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

            {error && <p className="text-red-600 mt-2">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
