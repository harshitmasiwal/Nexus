import React, { useState  , useContext} from "react";
import ReactDOM from "react-dom/client"
import Increment from "./Increment";
import GlobalData from "./globalContext";
import Counter from "./Counter";
import Temp from "./Temp";

function App(){
    const [count , setCount] = useState(0)
    return (<>
        <GlobalData.Provider value={{counts : count , setCounts : setCount}}>
        <div>
            <h2>this is parent </h2>
            <Increment></Increment>
            <Counter></Counter>
        </div>
        </GlobalData.Provider>
        <Temp></Temp>
    </>)
}

const display = ReactDOM.createRoot(document.getElementById('root'))
display.render(<App></App>)