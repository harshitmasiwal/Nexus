import { useState } from "react"

export default function Counter({value}){

    const [count,setCount] = useState(0)
    return (<div>
        <h1>{value} : {count}</h1>
        <button onClick={()=>{setCount(count+1)}}>Click me</button>
    </div>)
}