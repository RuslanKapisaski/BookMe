import { useEffect, useState } from "react";
import Hero from "./Hero";
import PopularDestinations from "./PopularDestinations";
import useApi from "../../hooks/useApi";
import Properties from "../properties/Properties";

export default function Home() {
  const [latest, setLatest] = useState([]);
  const { request } = useApi();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const result = await request("/api/properties/latest");
        setLatest(result);
      } catch (error) {
        throw error.message;
      }
    };
    fetchLatest();
  }, []);

  return (
    <>
      <div className="relative min-h-screen text-white bg-gradient-to-br from-sky-900 via-sky-800 to-sky-950">
        <Hero />

        <PopularDestinations />

        <section className="max-w-6xl mx-auto mt-16 px-4 pb-16">
          <h2 className="text-3xl font-bold mb-10">Latest Properties</h2>
          <Properties properties={latest} />
        </section>
      </div>
    </>
  );
}
