import { useEffect, useState } from "react"
import { useParams } from "react-router"
import MenuCard from "./MenuCard"

export default function RestaurantMenu() {
    const [RestMenu, setRestMenu] = useState([])
    const data = useParams()

    useEffect(() => {
        async function fetchData() {
            const proxyServer = "https://cors-anywhere.herokuapp.com/"
            const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6623758&lng=77.37344&restaurantId=${data.id}`
            const response = await fetch(proxyServer + swiggyAPI)
            const Data = await response.json()
            const tempData = Data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
            const filteredData = tempData.filter((item) => item?.card?.card?.categoryId)
            setRestMenu(filteredData)
        }
        fetchData()
    }, [data.id])

    return (
        <div className="w-[70%] pt-20 mx-auto">
            <div className="mt-6">
  <h2 className="text-2xl font-bold text-black">Menu</h2>
</div>
            <div>
                {RestMenu?.map((value, index) => (
                <div key={index}>
                    <MenuCard value={value.card?.card} />
                    {/* 👇 sirf yeh hr rakhenge */}
                    <hr className="my-6 border-t-10 border-gray-300" />
                </div>
            ))}
            </div>
            
        </div>
    )
}
