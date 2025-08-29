export default function DineoutCard({value}){

    return (
        <div>
        <div className="w-88 relative flex-shrink-0">
            <a target="_blank" href={value?.cta?.link}>
                <img className="w-88 h-46 -z-20 rounded-t-2xl object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+value?.info?.mediaFiles[0]?.url}>
            </img>
            <div className="absolute bottom-0 w-full h-20 bg-gradient-to-b from-transparent to-black"></div>
            <div className=" absolute bottom-0 w-full text-white">
                <div className="flex flex-row justify-between px-2 font-bold">
                     <p className="text-xl whitespace-nowrap overflow-hidden truncate">{value?.info.name}</p>
                <p className="text-bold">⭐{value?.info?.rating?.value}</p>
                </div>

               
               
            </div>
            </a>
        </div>
        <div className="px-2 bg-gray-100 border border-gray-300 rounded-b-2xl">
                <div className="flex justify-between text-xs mt-2 text-gray-700">
                    <p>{value.info.cuisines.join(".")}</p>
                    <p>{value.info.costForTwo}</p>
                </div>
                <div className="flex justify-between text-base text-gray-700">
                    <p>{value.info.locationInfo.formattedAddress}</p>
                    <p>{value.info.locationInfo.distanceString}</p>
                </div>
                <div className="mt-2 px-3 py-1 bg-sky-400 text-white w-28 text-xs rounded-xl"><p>Table Booking</p></div>
                <div className="bg-green-600 mt-4 rounded-xl text-white px-3 py-1">
                    FLAT 15% OFF
                </div>
                <div className="bg-green-200 rounded-xl mt-2 mb-4 text-green-700 px-3 py-1" >
                    Up to 10% off with bank offers
                </div>
                </div>

        </div>
    )
}