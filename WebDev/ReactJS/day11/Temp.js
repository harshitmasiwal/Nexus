import { useContext, useState } from "react"
import GlobalData from "./globalContext"

export default function Temp(){

    const data = useContext(GlobalData)
    
    return (<div>
        <h2>data is : {data}</h2>
    </div>)
}