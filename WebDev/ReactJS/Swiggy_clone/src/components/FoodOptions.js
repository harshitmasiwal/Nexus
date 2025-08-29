import data from "../utils/FoodData"
import FoodCard from "./FoodCard"

export default function FoodOptions(){

    return(
        <div className="grid grid-rows-2 grid-flow-col gap-4 max-w-[80%] h-[400px] container mx-auto mt-22 overflow-x-auto scroll-smooth no-scrollbar">
            {data.map((value)=>{
                return (
                    <div key={value.id}  className="w-40 flex-shrink-0">
                        <FoodCard  value={value}></FoodCard>
                  </div>
                )   
            })}
        </div>
    )
}