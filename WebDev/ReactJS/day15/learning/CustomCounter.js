import { useState } from "react"
import { useDispatch } from "react-redux"
import { Increment , Decrement , Reset , CustomIncrement } from "./Slicer1"

export default function CustomCounter(){
    
    const [num , SetNum] = useState("")
    const dispatch = useDispatch()

    function handelClick(){
        dispatch(CustomIncrement(Number(num)))
        SetNum("")
        // dispatch(Increment())
    }
 
    return (
        <>
            <h1>Enter the no. </h1>
            <input onChange={(e)=>SetNum(e.target.value)} value={num} type="text"></input>
            <button onClick={handelClick}>sumbit</button>
        </> 
    )
}