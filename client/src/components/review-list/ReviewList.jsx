import { formatMyDate } from "../../utils/formatMyDate";

export default function ReviewList({ reviews }) {
  return (
    <section className="space-y-2 max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-transparent">
      {reviews && reviews.length > 0 ? (
        <div className="max-h-80 ">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="relative min-h-50 max-h-100 bg-red bg-opacity-10 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-lg transition-all transform hover:shadow-xl mb-2"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-xl text-black">
                      {review.user.username}:
                    </span>
                  </div>

                  <div className="text-yellow-400 flex items-center space-x-1">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>

                <p className="m-2 text-lg text-black/90">{review.comment}</p>

                <span className="absolute bottom-4 right-6 pl-4 text-xs text-gray-300">
                  {`Published on: ${formatMyDate(review.createdAt)}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No reviews yet.</p>
      )}
    </section>
  );
}
