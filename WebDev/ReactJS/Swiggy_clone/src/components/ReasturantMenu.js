import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantMenu } from "../stores/ResturantSlice";
import MenuCard from "./MenuCard";

export default function RestaurantMenu() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [foodSelected, setFoodSelected] = useState(null);

  const menu = useSelector((state) => state.restaurants.menu[id]);
  const info = useSelector((state) => state.restaurants.info[id]);
  const offers = useSelector((state) => state.restaurants.offers[id]);

  useEffect(() => {
    if (!menu) {
      dispatch(fetchRestaurantMenu(id));
    }
  }, [id, menu, dispatch]);

  if (!menu) return <p className="text-center mt-20">Loading menu...</p>;

  return (
    <div className="w-[70%] pt-20 mx-auto">
      {/* 🍴 Restaurant Info */}
      <h1 className="text-3xl font-bold">{info?.name}</h1>
      <p className="text-gray-600">
        ⭐ {info?.avgRating} ({info?.totalRatingsString}) •{" "}
        {info?.costForTwoMessage}
      </p>
      <p className="text-sm text-gray-500">
        {info?.cuisines?.join(", ")} • {info?.sla?.slaString}
      </p>

      {/* 🎉 Offers */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Deals for you</h2>
        <div className="flex gap-4 overflow-x-auto mt-2">
          {offers?.map((offer, i) => (
            <div
              key={offer?.info?.offerIds?.[0] || i} // ✅ unique key fix
              className="min-w-[200px] border p-3 rounded-lg shadow bg-gray-50"
            >
              {offer.info.offerTag && (
                <span className="text-xs text-red-500 font-bold">
                  {offer.info.offerTag}
                </span>
              )}
              <p className="font-bold">{offer.info.header}</p>
              <p className="text-sm text-gray-500">{offer.info.description}</p>
              {offer.info.primaryDescription && (
                <p className="text-xs text-gray-400">
                  {offer.info.primaryDescription}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 📜 Menu with Veg / NonVeg filter */}
      <div className="mt-6">
        <div className="w-[70%] mb-5">
          <button
            onClick={() =>
              setFoodSelected(foodSelected === "veg" ? null : "veg")
            }
            className={` text-base py-1 font-bold px-8 border rounded-2xl ${
              foodSelected === "veg"
                ? "bg-green-500 border text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Veg
          </button>
          <button
            onClick={() =>
              setFoodSelected(foodSelected === "nonveg" ? null : "nonveg")
            }
            className={`ml-2 text-base py-1 font-bold px-8 border rounded-2xl ${
              foodSelected === "nonveg"
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            NonVeg
          </button>
        </div>
        <h2 className="text-2xl font-bold text-black">Menu</h2>
      </div>

      {/* Render Menu */}
      <div>
        {menu?.map((value, idx) => (
          <div
            key={`${value?.card?.card?.title || "menu"}-${idx}`} // ✅ unique key fix
          >
            <MenuCard
              value={value.card?.card}
              foodSlected={foodSelected}
            />
            <hr className="my-6 border-t-10 border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
