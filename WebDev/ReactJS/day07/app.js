import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client"
import Colorful from "./components/Colorful";

const display = ReactDOM.createRoot(document.getElementById('root'))

function Main(){

    let [count , setCount ] = useState(0)

    return (
       <>
       <div className="box2">
        <h1>count : {count}</h1>
        <button onClick={()=>{setCount(count+1)}} style={{backgroundColor : "yellow" , fontSize : "larger"}}>increment</button>
       </div>

       <Colorful name={count} ></Colorful> 
       {/* //ye wala hamesha execute hoga on incement as it is a function call and re redender hone pe pura main function execute hota  */}


       {/* if export karte time react.memo use kare to firr changes effect nahi honge in the childer <colorful> aur waha ki koi bhi isnrtuction execute nahi hogi until it is required
       jese props bheje like count then uske change hone pe sab render hoga
        */}
        {/* react.memo heavy hota hai isko jab need ho tab hi use karna  */}

       </>
    )
}

display.render(<Main></Main>);