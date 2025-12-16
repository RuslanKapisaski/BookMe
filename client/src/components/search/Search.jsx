import { useState } from "react";
import { useNavigate } from "react-router";

import useForm from "../../hooks/useForm";

export default function Search() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = async ({ city, guests }) => {
    const params = new URLSearchParams();

    if (city?.trim()) {
      params.append("city", city);
    }
    if (guests) {
      params.append("guests", guests);
    }

    navigate(`/catalog?${params.toString()}`);
  };

  const { register, formAction } = useForm(handleSearch, {
    city: "",
    guests: "",
  });
  return (
    <form action={formAction} className="relative flex items-center">
      <div className="bg-white shadow-xl rounded-full flex items-center overflow-hidden max-w-xl">
        <input
          type="text"
          placeholder="Where are you going?"
          className="flex-1 px-4 py-3 rounded-lg  focus:ring focus:ring-sky-300 text-black"
          {...register("city")}
        />

        <input
          type="number"
          placeholder="Guests"
          className="w-full md:w-32 px-4 py-3 rounded-lg focus:ring focus:ring-sky-300  text-black"
          {...register("guests")}
        />

        <button className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-4 font-medium">
          Search
        </button>
      </div>
    </form>
  );
}
