import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import useApi from "../../hooks/useApi";
import useForm from "../../hooks/useForm";
import Toast from "../toast/Toast";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (search) => {
    if (!search) return;
    console.log(search);

    const result = await useApi("");
  };

  const { register, formAction } = useForm(handleSearch, {
    search: " ",
  });
  return (
    <form action={formAction} className="relative flex items-center">
      <div className="bg-white shadow-xl rounded-full flex items-center overflow-hidden max-w-xl">
        <input
          type="text"
          placeholder="Search destination or property..."
          className="flex-1 px-6 py-4 text-gray-700 outline-none"
        />

        <button className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-4 font-medium">
          Search
        </button>
      </div>
    </form>
  );
}
