import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";
import { fetchRestaurants } from "../stores/ResturantSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Restaurents() {
  const dispatch = useDispatch();
  const [RestData, SetRestData] = useState([]);
  const { list } = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchRestaurants());
    }
  }, [dispatch, list.length]);

  // console.log(RestData)

  if (list.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="w-[80%] container mx-auto mt-20">
      <p className="font-bold text-xl">Top restaurants</p>
      <div className="flex flex-wrap gap-5 mt-10">
        {RestData?.map((value) => {
          return <RestCard value={value} key={value.info.id}></RestCard>;
        })}
      </div>
    </div>
  );
}
