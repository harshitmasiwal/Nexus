import React from "react";
import ReactDOM from "react-dom/client"
import {BrowserRouter , Routes , Route} from 'react-router'
import Home from "./components/Home";
import Reastaurants from "./components/Restaurants"
import RestaurentMenu from "./components/ReasturantMenu";
import SearchFood from "./components/SearchFood";

function App(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/restaurants" element={<Reastaurants></Reastaurants>}></Route>
                <Route path="/noida-1/:id" element={<RestaurentMenu></RestaurentMenu>}></Route>
                <Route path="/noida-1/:id/search" element={<SearchFood></SearchFood>}></Route>
            </Routes>
        </BrowserRouter>
           
        </>
    )
}

const display = ReactDOM.createRoot(document.getElementById("root"))
display.render(<App></App>)