export default function RestCard({value}){

    return (
        <div>
            <img className="w-70 h-45 rounded-2xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+value.info.cloudinaryImageId}></img>
        </div>
    )
}