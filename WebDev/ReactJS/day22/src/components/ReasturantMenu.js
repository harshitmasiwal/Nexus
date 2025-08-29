import { useEffect, useState } from "react"
import { useParams } from "react-router"


export default function RestaurentMenu(){

    const [RestMenu,setRestMenu] = useState({})

    const data = useParams()
    console.log(data.id)

    useEffect(()=>{

        async function fetchData(){
            const proxyServer = "https://cors-anywhere.herokuapp.com/"
            const swiggyAPI = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6623758&lng=77.37344&restaurantId=${data.id}&submitAction=ENTER`
            const response = await fetch(proxyServer+swiggyAPI)
            const Data = await response.json()
            setRestMenu(Data)
        }
        fetchData()
    },[])

    console.log(RestMenu)

    return(<>
        your restaurant id is : {data.id}
    </>)
}