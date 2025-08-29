export default function DineoutCard({value}){

    return (
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
    )
}