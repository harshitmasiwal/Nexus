import { useContext, useState } from "react"
import GlobalData from "./globalContext"

export default function Counter(){

    const data = useContext(GlobalData)
    
    return (<div>
        <h2>count : {data.counts}</h2>
        <button onClick={()=>data.setCounts(data.counts+1)}>+</button>
    </div>)
}