import React , {useState} from "react";
import ReactDOM from "react-dom/client"
import Footer from "./components/Footer"
import Header from "./components/Header";
import Card from "./components/Card";
import data from "./utils/dummydata";
import { greet , meet , arr as array } from "./utils/dummydata";


function App(){

    let [D , setD] = useState(data)

    function lowToHigh(){
        console.log(data) //vefore 
        data.sort((a,b) => a.cost - b.cost)
        console.log(data) //after
        setD([...data])  //using the spread operator becuse set state look for the changes as the array is stored in heap memory it addres is same so setD will think that it is not changed so we use [...data] instead of using setD(data)
    }

    function highToLow(){
        console.log(data) //before
        data.sort((a,b) => b.cost - a.cost )
        console.log(data) //after
        setD([...data])
    }

    //filter above 50 cost
    function above50(){
        console.log(data)
        const temp = data.filter((value)=> value.cost>50)
        console.log(temp)
        setD([...temp])
    }


    return (
        <>
        <Header></Header>
        <div className="filters">
            <button className="btn3" onClick={lowToHigh}>Sort Low to High price</button>
            <button className="btn3" onClick={highToLow}>Sort High to Low price</button>
            <button className="btn3" onClick={above50}>Above 50</button>
        </div>
        <div className="middle" style={{display:"flex" , gap : "10px" , flexWrap:"wrap"}}>
            {
                D.map((value,index) => {
                    return <Card key={index} cloth={value.cloth} price={value.price} img={value.img} cost={value.cost}></Card>
                })
            }
        </div>
        
        <Footer></Footer>
        </>
        
        
    )
}

const Display = ReactDOM.createRoot(document.getElementById('root'))
Display.render(<App></App>)