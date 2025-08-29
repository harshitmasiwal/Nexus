export default function FoodCard({value}){

    return(
        <a href={value?.action?.link}>
            <img className="w-36 h-44" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+value?.imageId}></img>
    
        </a>
    )   
}