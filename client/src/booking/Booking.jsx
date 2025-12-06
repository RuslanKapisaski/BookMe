import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import useForm from "../hooks/useForm";
import useApi from "../hooks/useApi";

export default function Booking({ property }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [period, setPeriod] = useState(0);
  const [bill, setBill] = useState(0);

  const { request } = useApi();

  useEffect(() => {
    if (startDate && endDate) {
      const msDiffTime = endDate - startDate;
      const daysDiffTime = Math.floor(msDiffTime / (1000 * 60 * 60 * 24));
      setPeriod(daysDiffTime);

      const calculatedBill = daysDiffTime * property.pricePerNight;
      setBill(calculatedBill);
    } else {
      setPeriod(0);
      setBill(0);
    }
  }, [startDate, endDate, property.pricePerNight]);

  const bookingHandler = async (bookingData) => {
    const booking = {
      period,
      bill,
      ...bookingData,
    };
    console.log(booking);

    try {
      const result = await request("/api/bookings", "POST", booking);
      console.log(result); // можете да добавите логика за обработка на отговор
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  const { register, formAction } = useForm(bookingHandler);

  return (
    <div className="flex flex: column gap-2">
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

      <div className="p-1 border color:gray border-gray-500 rounded-sm">
        {startDate && (
          <p className="mt-1 text-gray-700">
            Start Date: {startDate.toLocaleDateString()}
          </p>
        )}
        {endDate && (
          <p className="mt-1 text-gray-700 border-t">
            End Date: {endDate.toLocaleDateString()}
          </p>
        )}
        {period > 0 && (
          <>
            <p className="mt-1 text-gray-700 border-t">Period: {period} days</p>
            <p className="mt-1 text-gray-700 border-t">
              Cost: <strong>{bill}</strong> $
            </p>

            <form action={formAction}>
              <div className="mt-3">
                <label htmlFor="guestsCount" className="block text-gray-700">
                  Number of Guests:
                </label>
                <input
                  id="guestsCount"
                  type="number"
                  min="1"
                  max={property.capacity}
                  {...register("guestsCount", {
                    required: "Guests count is required",
                    min: { value: 1, message: "Minimum 1 guest" },
                    max: {
                      value: property.capacity,
                      message: `Maximum capacity is ${property.capacity}`,
                    },
                  })}
                  className="mt-1 w-full px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              <div className="mt-3">
                <label htmlFor="email" className="block text-gray-700">
                  Email:
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  {...register("email", { required: "Email is required" })}
                  className="mt-1 w-full px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              <input
                type="submit"
                value="Book"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 mt-3"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
