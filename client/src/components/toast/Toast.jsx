import { useState, useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed top-5 right-5 min-w-[250px] max-w-sm px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 shadow-lg
        text-white font-medium z-50
      `}
      style={{
        background:
          type === "success"
            ? "linear-gradient(135deg, rgba(52,211,153,0.3), rgba(16,185,129,0.3))"
            : "linear-gradient(135deg, rgba(239,68,68,0.3), rgba(220,38,38,0.3))",
      }}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          className="ml-4 text-white hover:text-gray-200"
          onClick={() => setVisible(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
