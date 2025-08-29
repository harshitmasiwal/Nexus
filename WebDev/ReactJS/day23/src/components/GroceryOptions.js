import data from "../utils/GroceryData"
import GroceryCard from "./GroceryCard"

export default function GroceryOptions(){

    return (
        <div className="container mx-auto max-w-[80%] mt-22">  
            <h2 className="font-bold text-xl">Shop groceries on Instamart</h2>
            <div className="mt-10 gap-2 flex flex-nowrap overflow-x-scroll no-scrollbar">
                {data.map((value)=>{
                return (
                    <div key={value.id}  className="w-40 flex-shrink-0">
                        <GroceryCard value={value}></GroceryCard>
                    </div>
                    
                )
            })}
            </div>
            
        </div>
    )
}
