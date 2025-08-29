import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import FoodOptions from "./components/FoodOptions";
import GroceryOptions from "./components/GroceryOptions";
import DineoutOptions from "./components/DineoutOptions";
import Restaurents from "./components/Restaurants";

function App(){
    return (
        <>
            <Header></Header>
            <FoodOptions></FoodOptions>
            <GroceryOptions></GroceryOptions>
            <DineoutOptions></DineoutOptions>
            <Restaurents></Restaurents>
        </>
    )
}

const display = ReactDOM.createRoot(document.getElementById("root"))
display.render(<App></App>)