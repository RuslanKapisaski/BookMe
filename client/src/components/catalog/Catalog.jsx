import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import Properties from "../properties/Properties";

export default function Catalog() {
  const { request } = useApi();
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const result = await request("/api/properties");
        setProperties(result);
      } catch (error) {
        throw error.message;
      }
    };
    fetchAll();
  }, []);

  return (
    <section className="max-w-full mx-auto px-6 py-12 bg-sky-800  ">
      <h2 className="text-3xl font-bold mb-10 text-white">Browse All Properties</h2>
      <Properties properties={properties} />
    </section>
  );
}
