import React from "react"
import ReactDOM from "react-dom/client"
import Counter from "./Counter"
import { Provider } from "react-redux"
import Store from "./Store"
import CustomCounter from "./CustomCounter"

function App(){

    console.log(Store)
    return (
        <>
            <Provider store={Store}>
                <Counter></Counter>
                <CustomCounter></CustomCounter>
            </Provider>
       
        </>
    )
}


// redux ka kamm hota hai jo ham store wagrah create kiye hai unko attach karwana react ke sath 
// aur redux toolkit hamare liye store create karne ka kamm karte hai 

// npm install @reduxjs/toolkit
//  npm install react-redux

const display = ReactDOM.createRoot(document.getElementById('root'))
display.render(<App></App>)

