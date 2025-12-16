import React, { useState } from "react";
import { redirect, useLocation, useNavigate, useParams } from "react-router";

import useApi from "../../hooks/useApi";
import useForm from "../../hooks/useForm";
import { useUserContext } from "../../contexts/UserContext";
import NotFound from "../not-found/NotFound";

export default function Review() {
  const { propertyId } = useParams();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { request, error: requestErr } = useApi();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const location = useLocation();
  const bgImage = location.state?.image;

  if (!user) {
    return (
      <NotFound
        message={"You do not have access to this content. Please login."}
      />
    );
  }

  const handleSubmit = async ({ comment, rating }) => {
    const ratingNumber = parseInt(rating, 10);

    if (!comment) {
      setError("Comment is required!");
      return;
    }
    if (ratingNumber < 1 || ratingNumber > 5) {
      setError("Rating should be between 1 and 5!");
      return;
    }

    try {
      await request("/api/reviews", "POST", {
        property: propertyId,
        rating: ratingNumber,
        comment,
      });

      setSuccessMessage("Review submitted successfully!");
      setError("");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {}
  };

  const { register, formAction } = useForm(handleSubmit, {
    rating: 1,
    comment: "",
  });

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <form
        className="text-gray min-w-[360px] m-20 bg-white/20 backdrop-blur-md shadow-2xl rounded-xl p-4 ring-2 ring-gray-500"
        action={formAction}
      >
        <h2 className="text-2xl font-semibold mb-4">Submit a Review</h2>

        {(error || requestErr) && (
          <div className="text-red-500 mb-4">{error || requestErr}</div>
        )}

        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}

        <div className="mb-4">
          <label htmlFor="rating" className="block text-lg mb-2">
            Rating (1 to 5)
          </label>
          <select
            id="rating"
            {...register("rating")}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-lg mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            {...register("comment")}
            rows="4"
            placeholder="Write your review..."
            className="w-full p-3 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600/50 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
