import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import MenuCard from "./MenuCard";
import { fetchRestaurantMenu } from "../stores/ResturantSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RestaurantMenu() {
  const dispatch = useDispatch()
  const [RestMenu, setRestMenu] = useState([]);
  const data = useParams();
  const [foodSelected, setFoodSelected] = useState(null);
  const menu = useSelector((state) => state.restaurants.menu[data.id]);



  
  useEffect(() => {
    if (!menu) { 
      dispatch(fetchRestaurantMenu(id));
    }
  }, [id, dispatch, menu]);

  if (!menu) {
    return <p className="text-center mt-20">Loading menu...</p>;
  }


  console.log(RestMenu)


  return (
    <div className="w-[70%] pt-20 mx-auto">

      <div>
        
      </div>

      <Link to="search">
        <div className="w-full p-2 rounded-xl text-2xl bg-gray-200 flex justify-center">
        <p>Seach for food</p>
      </div>
      </Link>
      

      <div className="mt-6">
        <div className="w-[70%] mb-5">
            <button onClick={()=>{foodSelected==='veg'?setFoodSelected(null):setFoodSelected('veg') }}  className={` text-base py-1 font-bold px-8 border rounded-2xl ${foodSelected==='veg'?"bg-green-500 border text-white":"bg-gray-300 text-black"}`}>Veg</button>
            <button onClick={()=>{foodSelected==='nonveg'?setFoodSelected(null):setFoodSelected('nonveg') }}  className={`ml-2 text-base py-1 font-bold px-8 border rounded-2xl ${foodSelected==='nonveg'?"bg-red-500 text-white":"bg-gray-300 text-black"}`}>NonVeg</button>
        </div>
        <h2 className="text-2xl font-bold text-black">Menu</h2>
      </div>
      <div>
        {RestMenu?.map((value) => (
          <div key={value?.card.card.categoryId}>
            <MenuCard value={value.card?.card} key={value?.card.card.categoryId
} foodSlected={foodSelected} />
            {/* 👇 sirf yeh hr rakhenge */}
            <hr className="my-6 border-t-10 border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
