import { Link } from "react-router"
export default function RestCard({value}){

        return (    
            <Link to={"/noida-1/"+value?.info?.id}>
            <div className="w-70 hover:scale-95 transform transition duration-300 ">
                <img className="w-70 h-45 object-cover rounded-2xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+value.info.cloudinaryImageId}></img>
                <p className="text-base font-bold whitespace-nowrap overflow-hidden truncate">{value?.info?.name}</p>
                <p className="text-base font-semibold mt-1">⭐{value.info.avgRating} • {value?.info?.sla?.slaString}</p>
                <p className="text-gray-600 mt-1 text-base whitespace-nowrap overflow-hidden truncate">{value?.info?.cuisines.join(",")}</p>
                <p className=" mt-1 text-gray-600 text-base whitespace-nowrap overflow-hidden truncate">{value?.info?.locality}</p>

            </div>
            </Link>
        )
    }