import { Link } from "react-router";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import LatestProperties from "./LatestProperties";
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
    <div className="bg-sky-950 min-h-screen text-white">
      {/* HERO */}
      <Hero />

      {/* POPULAR DESTINATIONS */}

      {/* LATEST PROPERTIES */}
      <Properties properties={latest} />
      <section className="max-w-6xl mx-auto mt-16 px-4 pb-16">
        <h2 className="text-3xl font-bold mb-6">Latest Properties</h2>
        <Properties properties={latest} />
      </section>
    </div>
  );
}
