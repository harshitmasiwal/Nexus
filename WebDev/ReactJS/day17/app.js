// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import Counter from "./count";

// const [arr,setArr] = useState(["c++" , "java" , "javascript"])

// function handleClick(){
//     setArr(["goLang",...arr])
// }

// function App(){
//     return (
//         <>
//             {arr.map((value,index)=>{
//                 return <Counter key={index}></Counter>
//             })}
//         </>
//     )
// }

// const display = ReactDOM.createRoot(document.getElementById("root"))
// display.render(<App></App>)


import React from "react";
import ReactDOM from "react-dom/client";
import Counter from "./count";

const idx = [0,1,2,3,4]

function App(){
    return (
        <>
            {idx.map((value,index)=>{
                return <Counter key={index}></Counter>
            })}
        </>
    )
}

const display = ReactDOM.createRoot(document.getElementById("root"))
display.render(<App></App>)