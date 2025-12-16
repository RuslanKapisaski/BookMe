export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-10 gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-lg ${
            p === page
              ? "bg-sky-600 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
