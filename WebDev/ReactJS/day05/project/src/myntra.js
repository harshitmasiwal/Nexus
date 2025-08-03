import React from "react";
import ReactDOM from "react-dom/client"
import Footer from "./components/Footer"
import Header from "./components/Header";
import Card from "./components/Card";
import data from "./utils/dummydata";
import { greet , meet , arr as array } from "./utils/dummydata";


function App(){
    return (
        <>
        
        <Header></Header>
    
        <div className="middle" style={{display:"flex" , gap : "10px" , flexWrap:"wrap"}}>
            {
                data.map((value,index) => {
                    return <Card key={index} cloth={value.cloth} price={value.price} img={value.img}></Card>
                })
            }
        </div>
        
        <Footer></Footer>
        </>
        
        
    )
}

const Display = ReactDOM.createRoot(document.getElementById('root'))
Display.render(<App></App>)