import React from "react";
import ReactDOM from "react-dom/client"
import {BrowserRouter , Routes , Route} from 'react-router'
import Home from "./components/Home";
import Reastaurants from "./components/Restaurants"
import RestaurentMenu from "./components/ReasturantMenu";
import SearchFood from "./components/SearchFood";
import SecondHome from "./components/SecondHome";
import { Provider } from "react-redux";
import Stores from "./components/Stores";
import Cart from "./components/Cart";
function App(){
    return (
        <>
        <Provider store={Stores}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route element={<SecondHome></SecondHome>}>
                    <Route path="/restaurants" element={<Reastaurants></Reastaurants>}></Route>
                    <Route path="/noida-1/:id" element={<RestaurentMenu></RestaurentMenu>}></Route>
                    <Route path="/noida-1/:id/search" element={<SearchFood></SearchFood>}></Route>
                    <Route path="/cart" element={<Cart></Cart>}></Route>
                    </Route>
            </Routes>
                
                
        </BrowserRouter>
        </Provider>
           
        </>
    )
}

const display = ReactDOM.createRoot(document.getElementById("root"))
display.render(<App></App>)