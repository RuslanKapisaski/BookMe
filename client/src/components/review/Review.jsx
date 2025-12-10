import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import useForm from "../../hooks/useForm";

export default function Review({ propertyId }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { request } = useApi();

  const handleSubmit = async ({ comment, rating }) => {
    if (!comment.trim()) {
      setError("Comment is required!");
      return;
    }

    setComment(comment);

    if (rating < 1 || rating > 5) {
      setError("Rating should be between 1 and 5!");
      return;
    }

    setRating(rating);

    try {
      const result = await request("/api/reviews", "POST", {
        propertyId,
        rating,
        comment,
      });

      setSuccessMessage("Review submitted successfully!");
      setComment("");
      setRating(1);
      setError("");
    } catch (error) {
      setError("Failed to submit the review. Please try again.");
      console.error("Error submitting review: ", error);
    }
  };

  const { register, formAction } = useForm(handleSubmit, {
    rating: 1,
    comment: "",
  });
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Submit a Review</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}

      <form action={formAction}>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-lg mb-2">
            Rating (1 to 5)
          </label>
          <select
            id="rating"
            onChange={(e) => setRating(Number(e.target.value))}
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
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
