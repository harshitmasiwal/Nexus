import { useState } from "react"
import { AddItem , RemoveItem } from "./Slice1"
import { useDispatch } from "react-redux"

export default function Card(props){

    const dispatch = useDispatch()

    const [InCart , SetInCart] = useState(false)

    function handleClick(){
        if(InCart){
            SetInCart(false)
            dispatch(RemoveItem())
        }
        else{
            SetInCart(true)
             dispatch(AddItem())
        }   
    }

    return (
     <div style={{border:"2px solid black", padding:"20px"}} >
        <h2>{props.name}    {props.rating}⭐</h2>
        <h2>Price : {props.price}</h2>
        <button onClick={handleClick}>{InCart?"REMOVE" : "ADD" }</button>
     </div>
        
    )
}