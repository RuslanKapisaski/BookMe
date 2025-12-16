import { useNavigate } from "react-router";

import useForm from "../../hooks/useForm";
import useApi from "../../hooks/useApi";

export default function AddProperty() {
  const navigate = useNavigate();
  const { request, error: reqError } = useApi();

  const submitHandler = async (formData) => {
    const emptyField = Object.entries(formData).find(
      ([_, value]) => value === "" || value === null || value === undefined
    );

    if (emptyField) {
      throw new Error(`Field ${emptyField[0]} is required!`);
    }

    try {
      await request("/api/properties", "POST", formData);
      navigate("/");
    } catch (err) {}
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
    <section
      className="flex justify-center bg-cover bg-center bg-no-repeat
    min-h-screen "
      style={{
        backgroundImage: "url('/images/add-property.webp')",
      }}
    >
      <form
        action={formAction}
        className="min-w-100 m-20 bg-white/10 backdrop-blur-md  shadow-2xl rounded-xl p-4 ring-1 ring-white/10
"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Add New Property
        </h2>

        {(error || reqError) && (
          <p className="text-red-400 bg-red-900/20 border border-red-600 rounded p-2 mb-4 text-center">
            {error || reqError}
          </p>
        )}

        <label className="block mb-2">
          <span className="text-white">Property Name</span>
          <input
            name="name"
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("name")}
          />
        </label>

        <label className="block mb-2">
          <span className="text-white">City</span>
          <input
            name="city"
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("city")}
          />
        </label>

        <label className="block mb-2">
          <span className="text-white">Address</span>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring "
            {...register("address")}
          />
        </label>

        <label className="block mb-2">
          <span className="text-white">Price per Night ($)</span>
          <input
            type="number"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring  "
            {...register("pricePerNight")}
            min="1"
          />
        </label>

        <label className="block mb-2">
          <span className="text-white">Max Guests</span>
          <input
            type="number"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("maxGuests")}
            min="1"
          />
        </label>

        <label className="block mb-2">
          <span className="text-white">Description</span>
          <textarea
            name="description"
            rows="4"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("description")}
          />
        </label>

        <label className="block mb-2">
          <span className="text-white">Image URL</span>
          <input
            name="image"
            type="url"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-sky-300"
            {...register("image")}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-sky-700/50 hover:bg-sky-800 text-white py-3 rounded-lg font-semibold text-lg"
        >
          Add Property
        </button>
      </form>
    </section>
  );
}
