import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from "./firstSlice";
import CryptoCard from "./CryptoCard";


export default function Coins(){
    
    const dispatch = useDispatch()
    const {data , loading , error} = useSelector((state)=>state.slice1)

    useEffect(()=>{
        dispatch(FetchData(30))
    },[])

    if(loading){
        return (<h1>data is loading please wait ...</h1>)
    }
    if(error){
        return (<h1>some error has occured check back later</h1>)
    }

    console.log(data)

    return (
        <>
            <div style={{display:"flex" , flexWrap:"wrap" , gap:"20px" , justifyContent:"center"}}>
                {data.map((value)=>{
                    return <CryptoCard key={value.id} coin={value}></CryptoCard>
                })}
            </div>
        </>
    )

}