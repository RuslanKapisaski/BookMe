import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import useApi from "../../hooks/useApi";
import Properties from "../properties/Properties";

export default function Catalog() {
  const { request, error } = useApi();
  const [properties, setProperties] = useState([]);
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city");
  const guests = searchParams.get("guests");

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams();

      if (city) {
        query.append("city", city);
      }
      if (guests) {
        query.append("guests", guests);
      }

      const queryString = query.toString();
      const url = queryString
        ? `/api/properties?${queryString}`
        : `/api/properties?`;

      const result = await request(url);

      setProperties(result);
    };
    fetchData();
  }, [city, guests]);

  return (
    <section className="relative max-w-full mx-auto px-40 py-24 bg-gradient-to-br from-slate-700 via-sky-900 to-black overflow-hidden">
      <div>
        <div className="absolute top-5 left-1/4 w-[600px] h-[800px] bg-cyan-400/20 rounded-full blur-[240px]" />
        <div className="absolute bottom-0 right-1 w-[600px] h-[400px] bg-fuchsia-500/20 rounded-full blur-[240px]" />
      </div>

      <div className="relative rounded-2xl bg-white/4 backdrop-blur-2xl border border-white/20 shadow-6xl p-16">
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-3">
          Browse All Properties
        </h2>

        <p className="text-white/60 text-sm mb-6">
          Hand-picked premium listings with modern design
        </p>

        <hr className="my-8 w-full h-px border-0 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

        {error && (
          <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-xl">
            Error occurred: {error}
          </p>
        )}

        {properties.length === 0 && (
          <p className="text-white/50 italic">There are no properties found</p>
        )}

        <Properties properties={properties} />
      </div>
    </section>
  );
}
