import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Counter from "./count";



function App(){

const [arr,setArr] = useState(["c++" , "java" , "javascript"])

function handleClick(){
    setArr(["goLang",...arr])
}

    return (
        <>
            {arr.map((value,index)=>{
                return <Counter key={index} value={value}></Counter>
            })} 

            {/* using the index as key creates the problem  */}

            <button onClick={handleClick}> Add Language</button>
        </>
    )
}

const display = ReactDOM.createRoot(document.getElementById("root"))
display.render(<App></App>)