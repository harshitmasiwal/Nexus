import React , {useState} from "react";
import ReactDOM from "react-dom/client"

//the hook will update every component which is having the count variable use in it 

function Counter(){

    let [count , setCount] = useState(0)


    function incCount(){
    count = count+1
    console.log("current count is : "+count)
    setCount(count)
    }
    function decCount(){
        count = count-1
        console.log("current count is : "+count)
        //using setState hook
        setCount(count)
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