import { useContext } from "react";
import { Link, useNavigate } from "react-router";

import { UserContext } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";

export default function Login() {
  const navigate = useNavigate();

  const { loginHandler } = useContext(UserContext);

  const loginSubmitHandler = async ({ email, password }) => {
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }

    await loginHandler({ email, password });

    navigate("/");
  };

  const { formAction, register, error } = useForm(loginSubmitHandler, {
    email: "",
    password: "",
  });

  {
    return (
      <section
        className="flex justify-center p-10 bg-sky-800"
        style={{
          backgroundImage: `url('/images/auth-img.jpg')`,
        }}
      >
        <form
          action={formAction}
          className="text-black/80 min-w-[300px] m-20 bg-white/20 backdrop-blur-xs shadow-2xl rounded-xs p-5 ring-1 ring-gray-500"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {/* Error message */}
          {error && (
            <p className="text-red-500 font-medium text-sm mb-3 text-center">
              {error}
            </p>
          )}

          <label className="block mb-6">
            <span>Email</span>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring
             focus:ring-sky-300"
              {...register("email")}
            />
          </label>

          <label className="block mb-6">
            <span>Password</span>
            <input
              className="mt-2 w-full px-4 py-2  border rounded-lg focus:outline-none focus:ring focus:ring-sky-300"
              {...register("password")}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-700 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400  hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </section>
    );
  }
}
