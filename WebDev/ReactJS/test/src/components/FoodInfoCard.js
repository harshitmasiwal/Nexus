  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { addItems, IncrementItems, DecrementItems } from "./CartSlice";

  export default function FoodInfoCard({ itemDesc }) {
    const info = itemDesc?.card?.info;

  const dispatch = useDispatch();
  const items = useSelector(state=>state.cartslice.items);

  const element = items.find(item => item.id === info.id);

  const count = element? element.quantity:0;

  function handleAdditems(){
    dispatch(addItems(info));
  }

  function handleIncrementItems(){
    dispatch(IncrementItems(info));
  }

  function handleDecrementItems(){
    dispatch(DecrementItems(info));
  }

    return (
      <div className="w-full flex justify-between gap-6 pb-6 border-b border-gray-200">
        {/* Left Side */}
        <div className="w-[70%]">
          <p className="font-semibold text-lg">{info?.name}</p>
          <p className="font-medium text-base">
            {"₹" + (info?.defaultPrice || info?.price) / 100}
          </p>
          {info?.ratings?.aggregatedRating?.rating && (
            <p className="text-sm">
              <span className="text-green-700">
                ⭐ {info?.ratings?.aggregatedRating?.rating}
              </span>
              <span> ({info?.ratings?.aggregatedRating?.ratingCountV2})</span>
            </p>
          )}
          <p className="text-gray-600 text-sm mt-1">{info?.description}</p>
        </div>

        {/* Right Side */}
        <div className="w-[30%] flex flex-col items-center">
          <img
            className="w-36 h-28 rounded-xl object-cover"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/" +
              info?.imageId
            }
            alt={info?.name}
          />

          {/* Button */}
          <div className="mt-2 w-36 py-1 text-white font-bold rounded-md border border-green-600 bg-green-600 text-center">
            {count === 0 ? (
              <button onClick={() => handleAdditems()} className="w-full">
                ADD
              </button>
            ) : (
              <div className="flex items-center justify-between px-2">
                <button onClick={() => handleDecrementItems()} className="px-2">
                  -
                </button>
                <span>{count}</span>
                <button onClick={() => handleIncrementItems()} className="px-2">
                  +
                </button>
              </div>
            )}
          </div>

          {/* Optional Customisable Text */}
          {info?.itemAttribute?.vegClassifier && (
            <p className="text-xs text-gray-500 mt-1">Customisable</p>
          )}
        </div>
      </div>
    );
  }
