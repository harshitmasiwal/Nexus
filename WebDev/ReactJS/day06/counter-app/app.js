import React from "react";
import ReactDOM from "react-dom/client"



function Counter(){

    let count = 0

    function incCount(){
        count = count+1
        console.log("current count is : "+count)
        //chainging manually by modifying the dom  --- NOT RECCOMONDED insted use the Hooks of React
        document.getElementById('count').innerHTML = "Count : "+count 
    }
    function decCount(){
        count = count-1
        console.log("current count is : "+count)
        //chainging manually by modifying the dom  ---- NOT RECCOMONDED insted use the Hooks of React 
        document.getElementById('count').innerHTML = "Count : "+count 
    }

    return(
        <div className="box">
            <h1 id="count">Count : {count}</h1>
            <div>
                <button onClick={incCount}>Increment++</button>
                <button onClick={decCount}>Decrement--</button>
            </div>
        </div>
    )
}




const Display = ReactDOM.createRoot(document.getElementById('root'))
Display.render(<Counter></Counter>)