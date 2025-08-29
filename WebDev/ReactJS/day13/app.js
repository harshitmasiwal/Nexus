import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/pages/Home"
import Features from "./components/pages/Features"
import Pricing from "./components/pages/Pricing"
import Contact from "./components/pages/Contact"
import Product from "./components/pages/Product";
import AllProducts from "./components/AllProduct";
import P1 from "./components/P1";
import P2 from "./components/P2";
import Github from "./components/pages/Github";

//to use the react router first bind the page in the browserrouter 

function App(){
    return (<>
    <BrowserRouter>
        <Navbar></Navbar> 

        {/* routes will contain the changing content on switching pages  */}
        <div className="main">
        <Routes>
            <Route path="/" element={<Home></Home>} ></Route>
            <Route path="/features" element={<Features></Features>}></Route>
            <Route path="/pricing" element={<Pricing></Pricing>}></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route path="/product" element={<Product></Product>}>
                <Route index element={<AllProducts></AllProducts>}></Route>
                <Route path="pid1" element={<P1></P1>}></Route>
                <Route path="pid2" element={<P2></P2>}></Route>
            </Route>
            <Route path="/github" element={<Github></Github>}></Route>
            <Route path="/github/:name" element={<Github></Github>}></Route>
        </Routes>
        </div>
        <Footer></Footer> 
        
    </BrowserRouter>
    </>)
}

const display = ReactDOM.createRoot(document.getElementById('root'))
display.render(<App></App>)