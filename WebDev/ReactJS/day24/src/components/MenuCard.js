import { useState } from "react";
import FoodInfoCard from "./FoodInfoCard";

export default function MenuCard({ value, foodSlected }) {
  const [isOpen, setIsOpen] = useState(true);

  // Handle nested categories
  if ("categories" in value) {
    return (
      <div className="w-full px-4">
        <p className="font-bold mt-4 text-2xl">{value.title}</p>
        <div className="ml-4">
          {value.categories.map((itemDesc, index) => (
            <MenuCard
              key={itemDesc?.categoryId || itemDesc?.title || index}
              value={itemDesc}
              foodSlected={foodSlected}
            />
          ))}
        </div>
      </div>
    );
  }

  // Filter logic
  let items = value.itemCards ?? [];
  if (foodSlected === "veg") {
    items = items.filter((item) => "isVeg" in item?.card?.info);
  } else if (foodSlected === "nonveg") {
    items = items.filter((item) => !("isVeg" in item?.card?.info));
  }

  return (
    <div className="w-full px-4 mt-4">
      {/* Heading + Toggle */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-2xl">{value.title}</p>
        <button className="font-bold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="black"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="black"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-4 space-y-4 pl-6 pr-6">
          {items.map((itemDesc) => (
            <FoodInfoCard
              key={itemDesc?.card?.info?.id}
              itemDesc={itemDesc}
            />
          ))}
        </div>
      )}
    </div>
  );
}
