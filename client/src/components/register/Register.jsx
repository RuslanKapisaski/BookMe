import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";

export default function Register() {
  const navigate = useNavigate();
  const { registerHandler } = useContext(UserContext);

  const registerSubmitHandler = async ({
    username,
    email,
    password,
    repeatPassword,
  }) => {
    if (!username) {
      throw new Error("Username is required!");
    }
    if (!email || !password) {
      throw new Error("Email and password are required!");
    }

    if (password !== repeatPassword) {
      throw new Error("Passwords mismatch!");
    }
    await registerHandler({ username, email, password, repeatPassword });

    navigate("/");
  };

  const { formAction, register, error } = useForm(registerSubmitHandler, {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <section
      className="flex justify-center p-6"
      style={{
        backgroundImage: `url('/images/auth-img.jpg')`,
      }}
    >
      <form
        action={formAction}
        className="text-black/80 min-w-[300px] m-20 bg-white/20 backdrop-blur-xs shadow-6xl rounded-xs p-6 ring-1 ring-gray-500"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-500 font-medium text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <label className="block mb-3">
          <span>Username</span>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring
             focus:ring-sky-300"
            {...register("username")}
            required
          />
        </label>

        <label className="block mb-3">
          <span>Email</span>
          <input
            type="email"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring
             focus:ring-sky-300"
            {...register("email")}
            required
          />
        </label>

        <label className="block mb-3">
          <span>Password</span>
          <input
            type="password"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring
             focus:ring-sky-300"
            {...register("password")}
            required
          />
        </label>

        <label className="block mb-5">
          <span>Repeat Password</span>
          <input
            type="password"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring
             focus:ring-sky-300"
            {...register("repeatPassword")}
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-lg font-semibold"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-800 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
}
