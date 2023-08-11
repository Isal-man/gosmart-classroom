import { useState } from "react"
import { ClassCard } from "../components"
import { useEffect } from "react";

export const Home = () => {
  // state
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("http://localhost:7060/api/v1/kelas");
      const result = await response.json();
      setData(result);
    }

    load();
  }, [])

  return (
    <main className="flex flex-col md:flex-row md:flex-wrap gap-8 justify-center items-center p-2 h-full w-full">
      {data.map((classes) => (
        <ClassCard key={classes?.id} {...classes} />
      ))}
      {data.map((classes) => (
        <ClassCard key={classes?.id} {...classes} />
      ))}
    </main>
  )
}
