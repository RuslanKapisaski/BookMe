import { useContext, useState } from "react";

import useForm from "../../hooks/useForm";
import useApi from "../../hooks/useApi";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function AddProperty() {
  const navigate = useNavigate();
  const { request } = useApi(null);

  const submitHandler = async (formData) => {
    const emptyField = Object.entries(formData).find(([key, value]) => !value);

    if (emptyField) {
      throw new Error(`Field${emptyField[0]} is required!`);
    }

    try {
      const result = await request("/api/properties", "POST", formData);
      navigate("/");
    } catch (err) {
      throw err;
    }
  };

  const { formAction, register, error } = useForm(submitHandler, {
    name: "",
    city: "",
    address: "",
    pricePerNight: 0,
    maxGuests: 0,
    description: "",
    image: "",
  });

  return (
    <section className="flex justify-center mt-10">
      <form
        action={formAction}
        className="w-full max-w-2xl bg-sky-900 shadow-xl rounded-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Add New Property
        </h2>

        {error && (
          <p className="text-red-400 bg-red-900/20 border border-red-600 rounded p-2 mb-4 text-center">
            {error}
          </p>
        )}

        <label className="block mb-4">
          <span className="text-white">Property Name</span>
          <input
            name="name"
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("name")}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-white">City</span>
          <input
            name="city"
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("city")}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-white">Address</span>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("address")}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-white">Price per Night ($)</span>
          <input
            type="number"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            required
            {...register("pricePerNight")}
            min="1"
          />
        </label>

        <label className="block mb-4">
          <span className="text-white">Max Guests</span>
          <input
            type="number"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            required
            {...register("maxGuests")}
            min="1"
          />
        </label>

        <label className="block mb-4">
          <span className="text-white">Description</span>
          <textarea
            name="description"
            rows="4"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("description")}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-white">Image URL</span>
          <input
            name="image"
            type="url"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("image")}
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-lg font-semibold text-lg"
        >
          Add Property
        </button>
      </form>
    </section>
  );
}
