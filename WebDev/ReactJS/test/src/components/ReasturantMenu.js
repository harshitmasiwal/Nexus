import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import MenuCard from "./MenuCard";

export default function RestaurantMenu() {
  const [RestMenu, setRestMenu] = useState([]);
  const [foodSelected, setFoodSelected] = useState(null);

  const data = useParams();

  useEffect(() => {
    async function fetchData() {
      const proxyServer = "https://cors-anywhere.herokuapp.com/";
      const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6623758&lng=77.37344&restaurantId=${data.id}`;
      const response = await fetch(proxyServer + swiggyAPI);
      const Data = await response.json();
      const tempData =
        Data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      const filteredData = tempData.filter(
        (item) => item?.card?.card?.categoryId
      );
      setRestMenu(filteredData);
    }
    fetchData();
  }, [data.id]);


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
