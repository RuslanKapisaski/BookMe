import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useApi from "../../hooks/useApi";
import useForm from "../../hooks/useForm";

export default function EditProperty() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { request, loading } = useApi();

  const submitHandler = async (values) => {
    const emptyField = Object.values(values).some((v) => !v);

    if (emptyField) {
      return;
    }

    await request(`/api/properties/${propertyId}`, "PATCH", values);
    navigate(`/properties/${propertyId}/details`);
  };

  useEffect(() => {
    async function fetchProperty() {
      const result = await request(
        `/api/properties/${propertyId}/details`,
        "GET"
      );
      console.log(result);

      setValues({
        name: result.name,
        city: result.city,
        address: result.address,
        pricePerNight: result.pricePerNight,
        maxGuests: result.maxGuests,
        description: result.description,
        image: result.image,
      });
    }
    fetchProperty();
  }, [propertyId]);

  const { formAction, register, values, setValues, error } = useForm(
    submitHandler,
    {
      name: "",
      city: "",
      address: "",
      pricePerNight: "",
      maxGuests: "",
      description: "",
      image: "",
    }
  );

  if (loading) {
    return <p className="text-center text-gray-500">Loading property...</p>;
  }

  return (
    <section className="flex justify-center mt-10">
      <form
        action={formAction}
        className="w-full max-w-2xl bg-sky-900 shadow-xl rounded-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Edit Property
        </h2>

        {error && (
          <p className="text-red-400 bg-red-900/20 border border-red-600 rounded p-2 mb-4 text-center">
            {error}
          </p>
        )}

        <label className="block mb-4">
          <span className="text-white">Property Name</span>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("name")}
          />
        </label>

        <label className="block mb-4">
          <span className="text-white">City</span>
          <input
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
            min="1"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("pricePerNight")}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-white">Max Guests</span>
          <input
            type="number"
            min="1"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("maxGuests")}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-white">Description</span>
          <textarea
            rows="4"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("description")}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-white">Image URL</span>
          <input
            type="url"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("image")}
            required
          />
        </label>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-lg font-semibold"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
