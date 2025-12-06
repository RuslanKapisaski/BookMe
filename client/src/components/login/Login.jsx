import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";

export default function Login() {
  const navigate = useNavigate();

  const { loginHandler } = useContext(UserContext);

  const loginSubmitHandler = ({ email, password }) => {
    if (!email) {
      return alert("Email is required");
    }
    if (!password) {
      return alert("Password is required");
    }

    loginHandler({ email, password });
    navigate("/");
  };

  const { formAction, register, error } = useForm(loginSubmitHandler, {
    email: "",
    password: "",
  });

  {
    return (
      <section className="flex justify-center mt-10">
        <form
          action={formAction}
          className="w-full max-w-sm bg-sky-900 shadow-xl rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Login
          </h2>

          {/* Error message */}
          {error && (
            <p className="text-red-500 font-medium text-sm mb-3 text-center">
              {error}
            </p>
          )}

          <label className="block mb-4">
            <span className="text-white">Email</span>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring
             focus:ring-sky-300"
              {...register("email")}
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-white">Password</span>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring
             focus:ring-sky-300"
              {...register("password")}
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-200 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </section>
    );
  }
}
