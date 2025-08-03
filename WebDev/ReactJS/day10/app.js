import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client"


//use memo hook 
//1. counter 
//2. fibonacci calculator




function Main(){


    const [Count,setCount] = useState(0)
    const [Num,setNum] = useState(0)
    const [ans , setAns] = useState(0)
    //const ans = findFibo(Num) //this is causing our page and function for recalculation whenerver the counter changes to fix this use reactmemo hook which only runs the function only when their is a change in its dependecy ariable
    //const ans = useMemo(()=>{    return findFibo(Num)},[Num]) //this will avoid exectuing function findFibo which was expensive call so our page becomes faster
    //the same can also be achived with another hook like useeffect and other but its optional

    //using useffect 

    useEffect(()=>{
        setAns(findFibo(Num))
    }, [Num])
    

    function findFibo(n){
        if( n <= 1){
            return n 
        }
        else{
            return findFibo(n-1)  + findFibo(n-2)
        }
    }
 

    return (<>
    <div className="box">
        <div className="counter">
            <h2>count : {Count}</h2>
            <button onClick={()=>setCount(Count+1)}>Increment</button>
            <button onClick={()=>setCount(Count-1)}>Decrement</button>
        </div>
        <div>
            <h2>the fibbonaccci number is : {ans}</h2>
            <input type="number" onChange={(e)=>{
                setNum(e.target.value)
            }} placeholder="enter the no."></input>
        </div>
    </div>
    </>)
}

const display = ReactDOM.createRoot(document.getElementById('root'))
display.render(<Main></Main>)