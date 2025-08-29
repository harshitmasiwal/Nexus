export default function GroceryCard({value}){

    return (
        <div>
        <a href={value.action.link}>
            <img className="w-40 h-44" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+value?.imageId}></img>
            <h2 className="mt-2 text-[#02060CBF] text-base font-bold text-center">{value?.action.text}</h2>
        </a>
            
        </div>
    )
}