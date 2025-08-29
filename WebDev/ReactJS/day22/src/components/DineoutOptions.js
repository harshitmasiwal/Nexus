import data from "../utils/DineoutData"
import DineoutCard from "./DineoutCard"

export default function DineoutOptions(){

    return (
        <div className="w-[80%] container mx-auto mt-20 p-2">
            <p className="font-bold text-xl">Discover best restaurants on Dineout</p>
            <div className="flex gap-5 mt-10 flex-nowrap overflow-x-scroll no-scrollbar">
                {data.map((value)=>{
                    return <DineoutCard value={value} key={value?.info?.id}></DineoutCard>
                })}

            </div>
            
        </div>
    )
}