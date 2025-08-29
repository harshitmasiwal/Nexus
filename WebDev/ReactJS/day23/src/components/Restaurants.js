import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";

export default function Restaurents() {
  const [RestData, SetRestData] = useState([]);

  useEffect(() => {
    async function fetchData() {

        const proxyServer = "https://cors-anywhere.herokuapp.com/"
        const swiggyAPI = "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.6623758&lng=77.37344&carousel=true&third_party_vend"
      const response = await fetch(proxyServer+swiggyAPI);
      const Data = await response.json();
      SetRestData(Data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    fetchData()
  }, []);

//   console.log(RestData);

  if(RestData?.length == 0){
    return (<>
      <Shimmer></Shimmer>
    </>)
  }

  return (
    <div className="w-[80%] container mx-auto mt-20">  
        <p className="font-bold text-xl">Top restaurants</p>
        <div className="flex flex-wrap gap-5 mt-10">
            {RestData?.map((value)=>{
                return <RestCard value={value} key={value.info.id}></RestCard>
            })}
        </div>
    </div>
  );
}
