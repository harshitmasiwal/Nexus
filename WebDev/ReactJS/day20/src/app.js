import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import FoodOptions from "./components/FoodOptions";
import GroceryOptions from "./components/GroceryOptions";

function App(){
    return (
        <>
            <Header></Header>
            <FoodOptions></FoodOptions>
            <GroceryOptions></GroceryOptions>
        </>
    )
}

const display = ReactDOM.createRoot(document.getElementById("root"))
display.render(<App></App>)