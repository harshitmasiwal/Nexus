import React from "react"
import ReactDOM from "react-dom/client"
import Store from "./store"
import { Provider } from "react-redux"
import Coins from "./Coins"
// api handling in redux    
//ye hamare liye globally data ko fetch request karta hai so agr kisi locally component ko data ki need ho to wo baar baar data fetch naa kre jo phele se recived data hai usko use kar le wo

//aur iske liye ham use karte hai CreateAsyncThunk() ko 
//ye hamare liye khud actions create kardegaa and dispatch bhi khud hi kar dega
// refer to the image 

function App(){
    return (<>
        <Provider store={Store}>
            <Coins></Coins>
        </Provider>
    </>)
}

const display = ReactDOM.createRoot(document.getElementById('root'))
display.render(<App></App>)