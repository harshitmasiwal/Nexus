import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";

//using useRef hook -> it lets to store the refrence of the value that can be needed
//in short across re render apne pass value sustain kare 

function Main() {

    const [count , setCount] = useState(0)
    let money = useRef(0)
    //console.log(money) //it returns an object 

  return (
    <>
      <div>
        <h2>count : {count}</h2>
        <button onClick={()=>setCount(count+1) }>inc</button>
        <button onClick={()=>setCount(count-1) }>dec</button>
      </div>
      <div>
        <h2>money : {money.current}</h2>
        <button onClick={()=>{
            money.current = money.current + 1 
            console.log(money)
        } }>inc</button>
        <button onClick={()=>{
            money.current = money.current - 1
            console.log(money.current)
        } }>dec</button>
      </div>
    </>
  );
}

const display = ReactDOM.createRoot(document.getElementById("root"));
display.render(<Main></Main>);
