import { useContext } from "react"
import GlobalData from "./globalContext"

export default function Increment(){

    const data = useContext(GlobalData)
    console.log(data)
    return (<div>
        <h2>this is from the child {data.counts*2}  </h2>
    </div>)
}