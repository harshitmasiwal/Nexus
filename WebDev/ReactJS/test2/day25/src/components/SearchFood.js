import { useParams } from "react-router";
import { useState } from "react";

export default function SearchFood() {
  const [searchQuery, setSearchQuery] = useState("");

  const data = useParams();
  console.log(data);

  return (
    <>
      <div className="w-full pt-20"></div>
      <div className="container mx-auto flex justify-center">
        <input
          className="w-[70%] max-w-xl px-4 py-2 text-xl bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search food"
        />
      </div>
    </>
  );
}
